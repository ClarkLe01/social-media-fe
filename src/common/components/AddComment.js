import { Textarea, Popover, Avatar, ActionIcon, Divider } from '@mantine/core';
import usePostComment from '@services/controller/usePostComment';
import { IconMoodEmpty, IconCamera, IconSend } from '@tabler/icons-react';
import { Picker } from 'emoji-mart';
import ThumbMedia from '@features/messages/components/ThumbMedia';
import { Dropzone } from '@mantine/dropzone';
import React, { useState, useRef, useEffect } from 'react';
import data from '@emoji-mart/data';
import { useQueryClient } from '@tanstack/react-query';
import { API_URL, MEDIA_URL } from '@constants';

function AddComment(props) {
    const queryClient = useQueryClient();
    const { currentUser, postId, valueComment, commentId, setShowEditComment, commentFile } = props;
    const [ commentContent, setCommentContent ] = useState(valueComment?valueComment:'');
    const flag = commentId?true:false;
    const [ showEmoji, setShowEmoji ] = useState(false);
    const [ attachFiles, setAttachFiles ] = useState([]);
    const dropzoneRef = useRef(null);
    const { createComment, createCommentError, createCommentLoading, updateComment } = usePostComment();

    useEffect(() => {
        // 👇️ only runs once
        if(commentFile){
            // console.log("asdas");
            let tempFiles = [];
            
            const url = commentFile;
            const toDataURL = url => fetch(url)
                .then(response => response.blob())
                .then(blob => new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                }));

            toDataURL(url)
                .then(dataUrl => {
                    var fileData = dataURLtoFile(dataUrl, "imageName.jpg");
                    // console.log("Here is JavaScript File Object", [ fileData ]);
                    tempFiles.push(fileData);
                });
                
            setAttachFiles( tempFiles );
        }
    }, [  ]); 

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[ 1 ]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([ u8arr ], filename, { type: mime });
    }

    const handleSendComment = () => {
        if (commentContent.length == 0 && attachFiles.length == 0) return;
        const form = new FormData();
        form.append('content', commentContent);
        form.append('post', postId);
        if (attachFiles.length > 0) {
            attachFiles.map((file) => {
                form.append('file', file);
            });
        }
        for (let [ key, value ] of form) {
            console.log('form', key, ':', value);
        }
        createComment(
            {
                data: form,
            },
            {
                onSuccess: (data) => {
                    console.log(data);
                    queryClient.invalidateQueries({ queryKey: [ `post/${postId}/comments` ] });
                },
                onError: (error) => {
                    console.log(error.response.data);
                    queryClient.invalidateQueries({ queryKey: [ `post/${postId}/comments` ] });
                },
            },
        );
        setCommentContent('');
        setAttachFiles([]);
    };

    const handleUpdateComment = () => {
        if (commentContent.length == 0 && attachFiles.length == 0) return;
        const form = new FormData();
        form.append('content', commentContent);
        //console.log(attachFiles.length);
        if (attachFiles.length > 0) {
            attachFiles.map((file) => {
                form.append('file', file);
            });
        }
        else {
            form.append('file', '');
        }
        for (let [ key, value ] of form) {
            console.log('form', key, ':', value);
        }
        updateComment(
            {
                data: form,
                pathParams: { commentId: commentId },
            },
            {
                onSuccess: (data) => {
                    setShowEditComment(false);
                    console.log(data);
                    queryClient.invalidateQueries({ queryKey: [ `post/${postId}/comments` ] });
                },
                onError: (error) => {
                    console.log(error.response.data);
                    queryClient.invalidateQueries({ queryKey: [ `post/${postId}/comments` ] });
                },
            },
        );
    };

    const handleEnterPress = (e) => {
        if (e.code == 'Enter' && !e.shiftKey) {
            e.preventDefault();
            //console.log(flag);
            if(!flag) handleSendComment();
            else handleUpdateComment();
        }
        if (e.code == "Escape" && !e.shiftKey) {
            e.preventDefault();
            setShowEditComment(false);
        }
    };

    return ( 
        <div className="mt-1">
            {commentId?false:true &&<Divider my="xs" className="my-0" />}
            <div
                className="write-your-comment mt-4"
                style={{
                    zIndex: 0,
                }}
            >
                <div className="d-flex align-items-start justify-content-center">
                    <Avatar src={MEDIA_URL+currentUser.avatar.replace(API_URL+'')} radius={'100%'} size={32} />
                    <div
                        className="add-comment ms-3"
                        style={{
                            width: '100%',
                        }}
                    >
                        <div
                            className="p-3"
                            style={{
                                backgroundColor: '#f1f3f5',
                                borderRadius: '10px',
                            }}
                        >
                            <Textarea
                                placeholder="Write a comment..."
                                autosize
                                minRows={1}
                                maxRows={4}
                                variant="filled"
                                classNames={{
                                    wrapper: 'border-0',
                                }}
                                value={commentContent}
                                onChange={(event) => setCommentContent(event.currentTarget.value)}
                                onKeyDown={handleEnterPress}
                            />
                            <div className="d-flex justify-content-start align-items-center mt-2">
                                <Popover
                                    position="top-end"
                                    shadow="md"
                                    classNames={{
                                        dropdown: 'p-0',
                                    }}
                                    opened={showEmoji}
                                    onChange={setShowEmoji}
                                    withArrow={true}
                                >
                                    <Popover.Target>
                                        <ActionIcon onClick={() => setShowEmoji((o) => !o)}>
                                            <IconMoodEmpty />
                                        </ActionIcon>
                                    </Popover.Target>
                                    <Popover.Dropdown className="me-4">
                                        <div>
                                            <Picker
                                                data={data}
                                                onEmojiSelect={(e) =>
                                                    setCommentContent(commentContent + e.native)
                                                }
                                            />
                                        </div>
                                    </Popover.Dropdown>
                                </Popover>
                                <ActionIcon className="ms-1" onClick={() => dropzoneRef.current()}>
                                    <IconCamera />
                                </ActionIcon>
                                <ActionIcon
                                    className="ms-auto"
                                    onClick={() => flag?handleUpdateComment():handleSendComment()}
                                    disabled={commentContent.length == 0 && attachFiles.length == 0}
                                >
                                    <IconSend />
                                </ActionIcon>
                            </div>
                        </div>
                        <div
                            className="d-flex justify-content-start align-items-center"
                            style={{
                                display: 'block',
                            }}
                        >
                            {attachFiles.length > 0 && (
                                <ThumbMedia
                                    files={attachFiles}
                                    setFiles={setAttachFiles}
                                    openDropZone={() => dropzoneRef.current()}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Dropzone
                openRef={dropzoneRef}
                // onFileDialogOpen
                onDrop={(file) => { setAttachFiles(file); }}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2} // accept={[ ...IMAGE_MIME_TYPE, MIME_TYPES.mp4 ]}
                accept={{
                    'image/*': [],
                    // All images
                    'video/*': [],
                }}
                maxFiles={1}
                hidden={true}
            />
        </div>
    );
}

export default AddComment;
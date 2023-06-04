import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, useProfile, useUserPost } from "@services/controller";
import { API_URL, MEDIA_URL } from "@constants";
import { Button, Image, SimpleGrid } from "@mantine/core";
import { navigatePath } from "@app/routes/config";
function Photos () {
    const { userId } = useParams();  // get param userId from url
    const { profileId } = useProfile(userId); // profile of user by params userId
    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();

    const [ userPosts, setUserPosts ] = useState([]);
    const { UserPostList, UserPostListError, UserPostListLoading } = useUserPost(userId); // posts of current user

    useEffect(() => {
        if(!UserPostListLoading && UserPostList){
            setUserPosts(UserPostList.data);
        }
    }, [ UserPostListLoading, UserPostList ]);
    
    useEffect(() => {
        if (profileId) {
            setUser(profileId.data);
        }
    }, [ profileId ]);

    const GoToPostDetail = (id) => {
        navigate(navigatePath.post.replace(':postId', id));
    };

    return (
        <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 py-3">
            <div className="card w-100 shadow-xss rounded-xxl border-0 mb-3">
                <SimpleGrid cols={4} spacing="xs" className="py-3 px-1">
                    {
                        userPosts.map((post, index) => (
                            post.images && post.images.map((file,value) => (
                                <div key={value}>
                                    <Image 
                                        maw='100%' 
                                        width={200}
                                        height={200} 
                                        mx="auto" 
                                        radius="md" 
                                        src={MEDIA_URL + file.file.replace(API_URL, '')} 
                                        alt="image" 
                                        onClick={(e) => GoToPostDetail(post.id)}
                                    />
                                </div>
                            ),
                            )
                        ))
                    }
                </SimpleGrid>
            </div>
        </div>
        
    );
}

export default Photos;
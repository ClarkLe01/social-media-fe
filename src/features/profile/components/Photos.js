import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth, useProfile, useUserPost } from "@services/controller";
import { API_URL } from "@constants";
import { Button, Image } from "@mantine/core";
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
        userPosts.map((post, index) => (
            post.images && post.images.map((file,value) => (

                <div key={value} className="col-xxl-3 col-xl-3 col-lg-4 col-md-6 py-3">
                    <Image 
                        maw='100%' 
                        width='100%' 
                        height={150} 
                        mx="auto" 
                        radius="md" 
                        src={API_URL + file.file.replace(API_URL, '')} 
                        alt="image" 
                        onClick={(e) => GoToPostDetail(post.id)}
                    />
                </div>
            ),
            )
        ),
        )
    );
}

export default Photos;
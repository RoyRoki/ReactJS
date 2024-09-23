import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams} from 'react-router-dom'

import {appwriteService} from '../auth/dbConfig'
import Button from '../components/Button'
import Container from '../components/container/Container'
import parse from 'html-react-parser'
import { useSelector } from 'react-redux'

function Post() {
  const [post, setPost] = useState(null)
  const {slug} = useParams() //:slug in main.jsx
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    appwriteService.getPost(slug).then((post) => {
      if(post) {
        setPost(post)
      } else {
        navigate("/")
      }
    })
  } , [slug, navigate])

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if(status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/")
      }
    })
  }

  return post ? (
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} />
          { isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </Link>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className='text-2xl font-bold'>
            {post.title}
          </h1>
          <div className='browser-css'>
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post

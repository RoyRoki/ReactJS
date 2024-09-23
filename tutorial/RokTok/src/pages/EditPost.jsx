import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import appwriteServices from '../auth/dbConfig'
import Container from '../components/container/Container'
import PostForm from '../components/post-form/PostForm'

function EditPost() {
  const [post, setPost] = useEffect(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if(slug) {
      appwriteServices.getPost(slug).then((post) => {
        if(post) setPost(post)
        else navigate("/")
      })
    }
  }, [slug, navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost

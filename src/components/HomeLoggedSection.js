import React from 'react'
import styled from 'styled-components'
import { FaCommentAlt, FaThumbsUp, FaRegEye } from 'react-icons/fa'
import Card from './Card'
import HomeLogged from "./pages/HomeLogged";
const StyledRoot = styled.div`
  padding: 50px 12px;
`
const StyledContainer = styled.div`
  max-width: 550px;
  width: 100%;
  margin: auto;
`
const HomeLoggedSection = () => {
  const date = new Date().toLocaleDateString()
  const onCommentClick = () => alert('You clicked comments')
  const onLikesClick = () => alert('You clicked comments')
  const onViewsClick = () => alert('You clicked comments')
  const buttons = [
    {
      label: (
        <>
          <FaCommentAlt /> 0 Comments
        </>
      ),
      onClick: onCommentClick,
    },
    {
      label: (
        <>
          <FaThumbsUp /> 242 Likes
        </>
      ),
      onClick: onLikesClick,
    },
    {
      label: (
        <>
          <FaRegEye /> 187288 Views
        </>
      ),
      onClick: onViewsClick,
    },
  ]
  return (
    <StyledRoot>
      <StyledContainer>
        <Card
          title="The Benefits of Green Apples"
          date={date}
          description="Green apples have a high fiber content which helps in increasing the
      body's metabolism. While consuming an apple, make sure that you're not
      tossing the peel in the trash. Consuming apple with its peel improves
      the overall health. Due to its high fiber content, apple helps in
      detoxification process. It keeps the liver and digestive system away
      from harmful elements."
          actions={buttons}
        />
      </StyledContainer>
    </StyledRoot>
  )
}
export default HomeLoggedSection

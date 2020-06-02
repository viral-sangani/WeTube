import styled from "styled-components"
import { Link } from "react-router-dom"
import ReactPlayer from "react-player"

const getColor = (props) => {
	if (props.isDragAccept) {
		return "#00e676"
	}
	if (props.isDragReject) {
		return "#ff1744"
	}
	if (props.isDragActive) {
		return "#2196f3"
	}
	return "#eeeeee"
}

export const StyledLink = styled(Link)`
	text-decoration: none;
	color: inherit;
`

export const Container = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	border-width: 2px;
	border-radius: 2px;
	border-color: ${(props) => getColor(props)};
	border-style: dashed;
	background-color: #fafafa;
	color: #bdbdbd;
	outline: none;
	transition: border 0.24s ease-in-out;
	margin: 10px;
`
export const StyledMainDiv = styled.div`
	width: 75%;
	height: 25vh;
	margin: auto;
	@media (max-width: 880px) {
		width: 90%;
	}
	display: flex;
	align-items: center;
`
export const StyledSecDiv = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	margin-left: 20px;
`
export const StyledImg = styled.img`
	width: 150px;
	height: 100px;
	border-radius: 50%;
`
export const StyledChannelName = styled.div`
	font-size: 32px;
`
export const StyledButtonDiv = styled.div`
	margin: 15px 0;
`
export const VideoDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	@media (max-width: 500px) {
		justify-content: space-around;
	}
`
export const ModelDiv = styled.div`
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`
export const TopDiv = styled.div`
	width: 100%;
	height: 20vh;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 40px;
`

export const StyledUploadForm = styled.div`
	width: 80%;
	margin: auto;
	@media (max-width: 880px) {
		width: 100%;
	}
`
export const PlayerWrapper = styled.div`
	position: relative;
	padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
`

export const StyledReactPlayer = styled(ReactPlayer)`
	position: absolute;
	top: 0;
	left: 0;
`
export const StyledVideoDescDiv = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-top: 30px;
`
export const StyledDescSideDiv = styled.div`
	width: 15%;
	@media (max-width: 500px) {
		width: 30%;
	}
	display: flex;
	align-items: center;
	justify-content: center;
`
export const StyledDescMainDiv = styled.div`
	display: flex;
	justify-content: space-between;
	width: 75%;
	@media (max-width: 500px) {
		width: 60%;
	}
`
export const StyledCommentDiv = styled.div`
	margin-top: 40px;
`

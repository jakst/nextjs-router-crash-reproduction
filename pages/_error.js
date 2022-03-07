export default function ErrorPage() {
	return <div>Error</div>
}

ErrorPage.getInitialProps = ({ err }) => {
	console.error(err)

	return {}
}

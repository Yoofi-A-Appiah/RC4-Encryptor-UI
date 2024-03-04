
import Footer from "./Footer"
import Navbar from "./Navbar"
const Layout =({element}) => {
    return(
        <>
        <Navbar/>
        {element}
        <Footer/>
        </>
    )
}
export default Layout
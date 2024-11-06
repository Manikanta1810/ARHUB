import UserCards from "../../components/UserComponents/UserCards"
import UserHeader from "../../components/UserComponents/UserHeader"
import UserHero from "../../components/UserComponents/UserHero"
import UserFooter from "../../components/UserComponents/UserFooter"
import SectionOne from "../../components/UserComponents/SectionOne"



const LandingPage = () => {
  return (
    <div>
      <UserHeader />
      <UserHero />
      <UserCards />
      <SectionOne />
      <UserFooter />
    </div>
  )
}

export default LandingPage
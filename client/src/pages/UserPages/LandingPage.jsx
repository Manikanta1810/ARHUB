import UserCards from "../../components/UserComponents/UserCards"
import UserHeader from "../../components/UserComponents/UserHeader"
import UserHero from "../../components/UserComponents/UserHero"
import UserFooter from "../../components/UserComponents/UserFooter"
import SectionOne from "../../components/UserComponents/SectionOne"
import SectionTwo from "../../components/UserComponents/Sectiontwo"
import SectionThree from "../../components/UserComponents/SectionThree"
import MoreButton from "../../components/UserComponents/MoreButton"


const LandingPage = () => {
  return (
    <div>
      <UserHeader />
      <UserHero />
      <UserCards />
      <SectionOne />
      <MoreButton />
      <UserFooter />
    </div>
  )
}

export default LandingPage
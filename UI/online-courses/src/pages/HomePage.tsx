import logoEduTech from "../assets/logo.jpeg";

export const HomePage = () => {
  return (
    <> 
    <nav className="navbar-home"></nav>
    <div>
      <a href="HomePage.tsx"></a>
      <img src={logoEduTech} alt="" />
      <label className="homepage-title">
          EduTechAcademy
        </label>
    </div> 
    </>
  )
}

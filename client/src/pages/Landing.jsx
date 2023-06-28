import Logo from '../components/logo'
import main from '../assets/images/main1.svg'
import Wraper from '../assets/wrappers/LandingPage'
import { Link } from 'react-router-dom'




const Landing = () => {
  return (
    <Wraper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>job <span>tracking</span>app</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem temporibus cum dicta commodi saepe nemo, aliquam distinctio et quibusdam perspiciatis ratione fuga voluptas iure tenetur hic minus recusandae quos a ab, iusto molestiae, quae laboriosam? Earum quos porro repellat dolorem.</p>
<Link to="/register" className="btn btn-hero">
Login / Register
</Link>
        </div>
        <img src={main} alt="job hunt" className='img main-img' />
      </div>
    </Wraper>
  )
}

export default Landing



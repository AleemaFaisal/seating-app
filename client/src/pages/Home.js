import Dashboard from '../components/Dashboard';
import { userContext } from '../contexts/userContext';


function Home({user})
{
    console.log("user at home: ", user);
    return (
        <userContext.Provider value={user} >
            <Dashboard />
        </userContext.Provider>
    );
}

export default Home;
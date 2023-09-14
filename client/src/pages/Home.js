import Dashboard from '../components/Dashboard';
import { userContext } from '../contexts/userContext';

function Home({user, setUser})
{
    console.log("user at home: ", user);

    return (
        <userContext.Provider value={user} >
            <Dashboard setUser={setUser} />
        </userContext.Provider>
    );
}

export default Home;
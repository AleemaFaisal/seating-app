import HeaderBar from "../components/HeaderBar";
import BookingTable from "../components/BookingTable";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

function HomePage({user, setUser})
{
    console.log("user at home: ", user);

    return (
        <div className="home-page">
            <UserContext.Provider value={user}>
               <HeaderBar setUser={setUser} />
                <BookingTable /> 
            </UserContext.Provider>
        </div>
    )

}


export default HomePage;
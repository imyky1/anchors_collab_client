import React,{useContext,useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import './success.css'
import axios from 'axios'
import { AuthContext } from "../../../Contexts/AuthState";
import { toast } from "react-toastify";
import mixpanel from "mixpanel-browser";

const Success = () => {
  const {loggedUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const host = import.meta.env.VITE_CLIENT_HOST;
    const [code,setCode] = useState()
    const [currentUser, setCurrentUser] = useState('')
    const [content,setContent] = useState('')
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect (()=>{
      mixpanel.track("Page visited Anchors Collab")
      setCurrentUser(loggedUser?.name)
      setCode(loggedUser?.referal_code)
    },[loggedUser])
    useEffect(()=>{
      const getData = async() => {
        try {
          const host = import.meta.env.VITE_SERVER_HOST;
          const response = await axios.get(`${host}/user/getall`);
          if (response.data) {
            const list = response.data.all_users.map((item) => ({
              name: item.name,
              count: item.refered_to?.length,
            }));
            // console.log(list);
            setLeaderboard(list);
          }
        } catch (error) {
          console.log(error)
        }
        
      }
      getData()
    },[])

    
    const WA_content = [
      {content:`Hey, 
just signed up for the waitlist on *anchors | Collab*!   
It's a platform where creators connect with brands for awesome collaborations. 
Let's be the first to know and join using ${window.location.origin}?refer=${code} !`},
      {content:`Hey,
Quick update – I'm on the waitlist for *anchors | Collab*, the space where creators unlock brand collaborations. 
🚀 Join me and be in the loop using ${window.location.origin}?refer=${code} !`},
      {
        content:`Hey, *Exciting news*! 
I'm on the waitlist for *anchors | Collab*, the go-to for content creators eyeing brand deals.   
🎉 Be one of the first to know by joining me using ${window.location.origin}?refer=${code} !`
      },
      {
        content:`Hey,
Just joined the waitlist for *anchors | Collab*!  It's where creators like us gear up for fantastic brand collaborations. 
Let's be in the loop together using ${window.location.origin}?refer=${code} !`
      }
    ]

    const handleSendMessage = async() => {
      mixpanel.track("Share Message anchors collab")
      const randomIndex = Math.floor(Math.random() * WA_content.length); // Generate random index
      const selectedContent = WA_content[randomIndex].content; // Get the content using the random index
      const message = encodeURIComponent(selectedContent); // Encoding message for URL

      // The URL to open WhatsApp with the provided message
      const whatsappURL = `https://api.whatsapp.com/send?text=${message}`;
      
      // Open the URL in a new window
      window.open(whatsappURL, "_blank");
    }

    const copyContent = () => {
      mixpanel.track("Copy Referral link anchors collab")
        
        const contentToCopy =`${window.location.origin}?refer=${code}`; // Replace with your content
        
        navigator.clipboard.writeText(contentToCopy)
          .then(() => {
            toast.info("referral link copied to clipboard", {
              position: "top-center",
              autoClose: 2000,
            });
          })
          .catch((error) => {
            console.error('Error copying content: ', error);
          });
      };
      
      const sortedLeaderboard = [...leaderboard].sort((a, b) => b.count - a.count);
      // Finding index of currentUser in the sorted leaderboard
      const currentUserIndex = sortedLeaderboard.findIndex(item => item.name === currentUser);
      // console.log(currentUser , currentUserIndex)
    return(
        <div className="success_container">
        <header className="header">
          <div onClick={()=>{navigate('/')}} className="logo"><img src="/image 5.png" alt="" /></div>
          <div className="profile">{loggedUser?.name} <img src={loggedUser?.profile} alt="" /></div>
        </header>
        <div className="content">
          
          <div className="text">
            <img src="/success.svg" alt="" />
            <h1>Congratulations! <br /> You are on the anchors waitlist!</h1>
            <div className="input_field"><img src="/internet.svg" alt="" />{`${window.location.origin}?refer=${code}`}<img onClick={copyContent} src="/copy.svg" alt="" className="copy" /></div>
            <p>Share your referral link to your friends to climb the leaderboard and <b>secure early & FREE access.</b> </p>
            <button onClick={handleSendMessage} className="WhatsApp"><img src="/WhatsApp.svg" alt="" />Share on WhatsApp</button>
          </div>
          <div className="leaderboard">
            <h1>Referral Leaderboard</h1>
            <p>Top <b>200 Referral</b> will get <br /> <b style={{color:'#FF5C5C'}}>early and Free access</b> to the platform</p>
            <table>
                    <thead>
                        <tr style={{background: "#F5F5F5"}}>
                            <th className="index">Rank</th>
                            <th className="name">Name</th>
                            <th className="count">Referral Count</th>
                        </tr>
                    </thead>
                    <tbody>
                    {currentUserIndex !== -1 && (
                                    <tr className="current">
                                        <td className="index">{currentUserIndex + 1}</td>
                                        <td className="name">You</td>
                                        <td className="count">{sortedLeaderboard[currentUserIndex].count}</td>
                                    </tr>
                    )}
                        {sortedLeaderboard.map((item, index) => (
                            item.name !== currentUser &&<tr key={index}>
                                <td className="index">{index + 1}</td> {/* Index starts from 0, so add 1 */}
                                <td className="name">{item.name.split(' ')[0]}</td>
                                <td className="count">{item.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
        </div>
       
      </div>
    )
}
export default Success
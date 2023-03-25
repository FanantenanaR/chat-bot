import { Avatar, IconButton } from "@mui/material";
import { useState } from "react";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { blue, deepPurple } from "@mui/material/colors";
import MessageBox from "../components/MessageBox";
import moment from "moment/moment";

const Chat = () => {
    const [messageInputValue, setMessageInputValue] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [listMessage, setListMessage] = useState([
        {
            msg: [{
                text: "Bonjour,\n Comment pourrais je savoir mon numero?",
                dateHeure: moment().format("hh:mm")
            }],
            dateHeure: moment().format("hh:mm"),
            owner: "ME"
        },
        {
            msg: [{
                text: "Bonjour à vous,\n Vous pouvez composer *123#",
                dateHeure: moment().format("hh:mm")
            }],
            dateHeure: moment().format("hh:mm"),
            owner: "Airtel"
        }
    ]);



    const handleSendMessage = () => {
        const messageEnvoye = messageInputValue.trim().replace(/`\s*`/g, '');
        console.log("send", messageEnvoye)
        if (messageEnvoye !== "") {
            if (listMessage.length > 0 && listMessage[listMessage.length-1].owner === "ME") {
                listMessage[listMessage.length-1].msg.push({
                    text: messageEnvoye,
                    dateHeure: moment().format("hh:mm"),
                });
            } else {
                setListMessage([
                    ...listMessage,
                    {
                        msg: [{
                            text: messageEnvoye,
                            dateHeure: moment().format("hh:mm")
                        }],
                        dateHeure: moment().format("hh:mm"),
                        owner: "Airtel"
                    }
                ])
            }
            setMessageInputValue("");
            
        }
    };

    const receiveMessage = () => {
        // TODO ato no atsofoka ilay code raha maharay message izy
    }
    const handleInput = (event) => {
        event.target.scrollTop = 0;
        event.target.style.height = 'auto';
        event.target.style.height = event.target.scrollHeight + 'px';
    }

    const handleInputChange = (event) => {
        setMessageInputValue(event.target.value);
    }

    
    return (
        <div className="md:container mx-auto h-[100vh] flex flex-col bg-[#7733DC] drop-shadow-xl">
            <div className="py-4 basis-1">
                <h1 className="text-2xl text-white font-[poppins] text-center">Chat</h1>
            </div>
            <div className="h-full basis-full bg-white rounded-t-3xl pt-4 flex flex-col text-sm">
                <div className="basis-11/12 flex flex-col justify-items-end py-2">
                    {
                        listMessage.map(
                            (message) => (
                                <div className="my-1">
                                    <MessageBox message={message} />
                                </div>
                            )
                        )
                    }
                </div>

                <div className="basis-1/12 sticky bottom-0 py-1">
                    <div className="relative flex px-3 pb-3">
                        <span className="absolute inset-y-0 mb-3 flex items-center">
                            <IconButton aria-label="+" className="inline-flex items-center justify-center rounded-full h-12 w-12 " onClick={(event) => setAnchorEl(event.currentTarget)}>
                                <MdOutlineAddCircleOutline />
                            </IconButton>
                        </span>
                        <textarea name="" id="inputMessage" placeholder="Aa" onInput={handleInput} onChange={handleInputChange} value={messageInputValue} rows={1} className=" min-h-24 max-h-[400px] rounded-2xl bg-gray-200  resize-none focus:placeholder-gray-400 w-full text-gray-600 placeholder-gray-300 pl-12 pr-14 py-3 scroll-pt-2 scrollbar " style={{scrollbarWidth: '5px'}}></textarea>
                        <span className="absolute right-7 pr-1 flex items-center">
                            <IconButton aria-label="+" className="hover:bg-slate-400 inline-flex items-center justify-center rounded-full h-12 w-12 " onClick={handleSendMessage}>
                                <FiSend color={deepPurple[800]} className="" />
                            </IconButton>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
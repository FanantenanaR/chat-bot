import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import moment from "moment/moment";

const MessageSent = (props) => {
    const { message } = props;
    return (
        <div className="text-end w-full flex flex-col items-end px-2 max-w-full">
            {
                message.msg.map((mess, index) => {
                    console.log("heure", mess)
                    if (message.msg.length -1 === index) {
                        return (
                            <div className="flex flex-row items-center">
                                <div className="text-slate-300 align-middle h-full px-3">{mess.dateHeure}</div>
                                <div className="px-3 py-2 mt-1 w-fit break-words max-w-[90%] bg-[#7733DC] text-white rounded-2xl  text-start">
                                    {
                                        mess.text.split("\n").map((m) => (
                                            <p>{m}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    } else if (index === 0) {
                        return (
                            <div className="flex flex-row items-center">
                                <div className="text-slate-300 align-middle h-full px-3">{mess.dateHeure}</div>
                                <div className="px-3 py-2 mt-1 w-fit break-words max-w-[90%] bg-[#7733DC] text-white rounded-3xl rounded-br text-start">
                                    {
                                        mess.text.split("\n").map((m) => (
                                            <p>{m}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    } else if (index === message.msg.length - 1) {
                        return (
                            <div className="flex flex-row items-center">
                                <div className="text-slate-300 align-middle h-full px-3">{mess.dateHeure}</div>
                                <div className="px-3 py-2 mt-1 w-fit break-words max-w-[90%] bg-[#7733DC] text-white rounded-3xl rounded-tr text-start">
                                    {
                                        mess.text.split("\n").map((m) => (
                                            <p>{m}</p>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                    return (
                        <div className="flex flex-row items-center">
                            <div className="text-slate-300 align-middle h-full px-3">{mess.dateHeure}</div>
                            <div className="px-3 py-2 mt-1 w-fit break-words max-w-[90%] bg-[#7733DC] text-white rounded-3xl rounded-r text-start">
                                {
                                    mess.text.split("\n").map((m) => (
                                        <p>{m}</p>
                                    ))
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

const MessageReceived = (props) => {
    const { message } = props;
    return (
        <div className="text-start w-full flex px-2">
            <div className="flex flex-row h-full w-full gap-x-1">
                <div className="pt-2">
                    <Avatar sx={{ bgcolor: deepPurple[500] }} sizes="small" className="">A</Avatar>
                </div>
                <div className="">
                    {
                        message.msg.map((mess, indice) => {
                            if (message.msg.length -1 === indice) {
                                return (
                                    <div className="flex flex-row items-center">
                                        <div className="px-3 py-2 mt-1 w-fit break-words bg-[#ececec] text-black border border-slate-50 rounded-2xl">
                                            {
                                                mess.text.split("\n").map((m) => (
                                                    <p>{m}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="text-slate-300 align-middle h-full px-3">{mess.dateHeure}</div>
                                    </div>
                                )
                            } else if (indice === 0) {
                                return (
                                    <div className="flex flex-row items-center">
                                        <div className="px-3 py-2 mt-1 w-fit break-words bg-[#ececec] text-black border border-slate-50 rounded-3xl rounded-bl-md">
                                            {
                                                mess.text.split("\n").map((m) => (
                                                    <p>{m}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="text-slate-300 align-middle h-full px-3">{mess.dateHeure}</div>
                                    </div>
                                )
                            } else if (indice === message.msg.length) {
                                return (
                                    <div className="flex flex-row items-center">
                                        <div className="px-3 py-2 mt-1 w-fit break-words bg-[#ececec] text-black border border-slate-50 rounded-3xl rounded-tl-md">
                                            {
                                                mess.text.split("\n").map((m) => (
                                                    <p>{m}</p>
                                                ))
                                            }
                                        </div>
                                        <div className="text-slate-300 align-middle h-full px-3">{mess.dateHeure}</div>
                                    </div>
                                )
                            } 
                            return (
                                <div className="flex flex-row items-center">
                                    <div className="px-3 py-2 mt-1 w-fit break-words bg-[#ececec] text-black border border-slate-50 rounded-3xl rounded-l-md">
                                        {
                                            mess.text.split("\n").map((m) => (
                                                <p>{m}</p>
                                            ))
                                        }
                                    </div>
                                    <div className="text-slate-300 align-middle h-full px-3">{mess.dateHeure}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
const MessageBox = (props) => {
    const { message } = props;
    if (message.owner === "ME") {
        return (
            <MessageSent message={message} />
        )
    }
    return (
        <MessageReceived message={message} />
    )
};

export default MessageBox;
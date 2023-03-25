import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useEffect, useState } from "react";
import LinkPreview from "./LinkPreview";
import parse from 'html-react-parser';

const CONDITION_LIENS = /([\w+]+\:\/\/)?([\w\d-]+\.)*[\w-]+[\.\:]\w+([\/\?\=\&\#\.]?[\w-]+)*\/?/gm;
const CONDITION_BACKQUOTE = /`\s*`/g;

const formatDate = (daty) => {
    const yyyy = daty.getFullYear();
    let mm = daty.getMonth() + 1; // Months start at 0!
    let dd = daty.getDate();

    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;

    const formattedToday = `${dd}/${mm}/${yyyy}`;
    return formattedToday;
};

const formatHeure = (daty) => {
    return daty.toTimeString().split(" ")[0].slice(0,5);
};

const getAllLink = (content) => {
    const liste = [...content.matchAll(CONDITION_LIENS)];
    return liste.map(m => m[0]);
};

const getAllCodeIndex = (content) => {
    const result = [];
    content = content.replace(CONDITION_BACKQUOTE, '');
    let compter = (content.match(/`/g) || []).length;
    if (compter < 2) {
        return result;
    }
    let debut = content.indexOf("`");
    let fin = content.indexOf("`", debut + 1);
    
    if (fin - debut <= 1) {
        return result;
    }

    result.push({
        start: debut, 
        end: fin, 
        code: content.substring(debut + 1, fin),
        index: "code"
    });

    compter -= 2;

    while (compter > 1) {
        debut = content.indexOf("`", fin + 1 );
        fin = content.indexOf("`", debut + 1);
        const sub = content.substring(debut + 1, fin);
        if (fin - debut > 1) {
            result.push({
                start: debut, 
                end: fin, 
                code: sub,
                index: "code"
            });
        } else  {
            content = content.replace(sub, "");
        }
        compter -=2;
    } 
    console.log("Code found", result);
    return result;
};


const rectifyContenue = (contenue, listCode) => {
    for (let index = 0; index < listCode.length; index++) {
        const singleCode = listCode[index];
        contenue = contenue.replace(`\`${singleCode.code}\``, `[[${singleCode.index}]]`);
    }
    return contenue;
    
};

const getCorps = (contenue, listCode) => {
    const tableau = contenue.split("[[code]]");
    console.log("split code ", tableau, listCode);
    const result = [];
    for (let index = 0; index < tableau.length; index++) {
        const element = tableau[index];
        result.push({
            type: "text",
            content: element
        });
        if (index < listCode.length) {
            result.push({
                type: "code",
                content: listCode[index].code
            });
        }
    }
    return result;
};

const MessageContent = (props) => {
    const { content } = props;
    const [contenueTextuelle, setContenueTextuelle] = useState(content.text);
    const dateFormated = formatDate(content.dateHeure);
    const heureFormated = formatHeure(content.dateHeure);
    const [listLink, setListLink] = useState([]);
    const [contenueMessage, setContenueMessage] = useState([]);
    useEffect(() => { 

        let cc = content.text;

        cc = cc.replace(CONDITION_BACKQUOTE, '');
        
        const t1 = performance.now();
        const resultFirst = getAllCodeIndex(cc);
        const t2 = performance.now();
        const elapsedTime = t2 - t1;
        console.log(`getAllCodeIndex took ${elapsedTime.toFixed(2)} milliseconds to execute`);
        console.log("every code first", resultFirst);

        
        cc = rectifyContenue(cc, resultFirst)
        
        const arrayListe = getAllLink(cc);
        setListLink(arrayListe);
        console.log("liste liens ", arrayListe);
        
        arrayListe.map((liens) => {
            liens.trim();
            cc = cc.replace(liens, `<span className="underline underline-offset-2 text-sky-600 pr-1">${liens}</span>  `);
        });
        console.log(cc);
        content.text = cc;

        const tab = getCorps(cc, resultFirst);
        
        setContenueTextuelle(cc);
        setContenueMessage(tab);
    }, []); 
    return (
        <div className="grid grid-cols-12 my-2">
            <div className="col-span-1 px-1 pt-2 flex justify-center">
                <Avatar sx={{ bgcolor: deepPurple[500] }} className="">OP</Avatar>
            </div>
            <div className="col-span-11">
                <p className="items-center pt-1">
                    <span className="font-bold text-base">
                        Rakoto
                    </span>
                    <span className="font-light text-xs ml-2 text-gray-500">{dateFormated}</span> 
                    <span className="font-light text-xs ml-1 text-gray-500">{heureFormated}</span>
                </p>
                <div className="font-normal text-sm ">
                    {
                        contenueMessage.map((msg, indice) => {
                            
                            return (
                                <p>{parse(msg.content)}</p>
                            );
                        })
                    }
                </div>
            </div>
            <div className="col-span-1 px-4 pt-1 flex justify-center">
                <p className="font-light text-xs">  </p>
            </div>
            <div className="col-span-11">
                {
                    listLink.map((liens, indice) => (
                        <LinkPreview key={`Link${indice}Preview${indice+55}xfjdsf`} urlLink={liens} />
                    ))
                }
            </div>
            
        </div>
    );
};

export default MessageContent;

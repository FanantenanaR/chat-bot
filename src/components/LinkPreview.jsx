import { Card, CardActionArea, CardContent, CardMedia, Skeleton, Typography, useTheme } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import loadingimage from "../assets/loading-image.json";
import noLinkPreview from "../assets/no-link-preview.json";

const requestAPI = async (link, sendURL) => {
  var myHeaders = new Headers();
  myHeaders.append("X-API-Key", "1c5ce8d6-a4d2-415c-a86e-46e8212932bc");

  var formdata = new FormData();
  formdata.append("link", sendURL);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  };

  try {
    return fetch(link, requestOptions);
  } catch (error) {
    throw error;
  }
};


const LinkPreview = ({urlLink}) => {
  // const liens = new URL(url);

  const [loadedImage, setLoadedImage] = useState(false);
  const [imageDescription, setImageDescription] = useState("Preview");
  const [imageLink, setImageLink] = useState(";none;");
  const [titleLink, setTitle] = useState(";charging;");
  const [description, setDescription] = useState(";blank;");
  const [imageAnimationPreview, setImageAnimationPReview] = useState(loadingimage);
  const [playOnce, setPlayOnce] = useState(false);
  const [iconLink, setIconLink] = useState("");
  const handleLinkClicked = () => {
    console.log("clicked link");
    
  };
  const theme = useTheme();

  


  useEffect(() => { 
    if (urlLink.includes("localhost") || urlLink.includes("127.0.0.1")) {
      setPlayOnce(true);
      setImageAnimationPReview(noLinkPreview);
      setTitle(null);
      setDescription(null);
    } else {
      requestAPI("https://api.peekalink.io/is-available/", urlLink).then((response) => response.json()).then((reponse) => {
        console.log("reponse ", reponse);
        if (reponse.isAvailable) {
          requestAPI("https://api.peekalink.io", urlLink).then((response) => response.json()).then((rep) => {
            console.log(rep);
            if (Object.hasOwn(rep, 'image')) {
              const imageObj = rep.image;
              if (Object.hasOwn(imageObj, 'url')) {
                setImageLink(imageObj.url);
              } else {
                setImageAnimationPReview(noLinkPreview);
              }
            }
            setLoadedImage(true);
            if (Object.hasOwn(rep, 'title')) {
              setTitle(rep.title);
            } else {
              setTitle(null);
            }
            if (Object.hasOwn(rep, 'description')) {
              setDescription(rep.description);
            } else {
              setDescription(null);
            }
            if (Object.hasOwn(rep, 'icon')) {
              if (Object.hasOwn(rep.icon, 'url')) {
                setIconLink(rep.icon.url);
              }
            }
          }).catch((errorRep) => {
            // TODO Handle error 
            console.log("error rep", errorRep);
            setTitle(null);
            setDescription(null);
            setPlayOnce(true);
            setImageAnimationPReview(noLinkPreview);
          });
        } else {
          setTitle(null);
          setDescription(null);
          setPlayOnce(true);
          setImageAnimationPReview(noLinkPreview);
        }
        
      })
      .catch((error) => {
        // TODO Handle error
        
        setTitle(null);
        setDescription(null);
        setPlayOnce(true);
        setImageAnimationPReview(noLinkPreview);
        console.log(error);
      })
    }
  }, []);
  return (
    <div className='py-2'>
      <Card sx={{ maxWidth: 345, borderRadius: "10px" }} className={`shadow border-2 border-gray-200 rounded`}>
        <CardActionArea onClick={handleLinkClicked}>
          {
            loadedImage ? (
              <CardMedia
                component="img"
                height="140"
                image={imageLink}
                alt={imageDescription}
                className="mt-2"
                sx={{ marginTop: "-16px", zIndex: "50", width: "85%", }}
              />
            ) : (
              <Player
                autoplay
                keepLastFrame={playOnce}
                loop={!playOnce}
                src={imageAnimationPreview}
                // style={{ height: '300px', width: '300px' }}
              >
                {/* <Controls visible={true} buttons={['play', 'repeat', 'frame', 'debug']} /> */}
              </Player>
            )
          }
          <CardContent>
            {
              titleLink !== null && (
                <Typography variant='h6'>
                  {
                    titleLink === ";charging;" ? (
                      <Skeleton variant='text' animation="wave" width={'65%'} />
                    ) : (
                      <span>{titleLink}</span>
                    )
                  }
                </Typography>
              )
            }
            <div className="grid grid-flow-col auto-cols-max">
              {
                iconLink !== "" && (
                  <img src={iconLink} alt="Icon du site" className="rounded-lg shadow h-4 mr-3 " />
                )
              }
              <p className='font-light text-sm text-blue-500 text-ellipsis overflow-hidden '> {urlLink}</p>
            </div>
            {
              description !== null && (
                <Typography variant="body2" color="text.secondary">
                  {
                    description === ";blank;" ? (
                      <>                
                        <Skeleton animation="wave" variant='text' />
                        <Skeleton animation="wave" variant='text' width={'75%'} />
                      </>
                    ) : (
                      <span>{description}</span>
                    )
                  }
                </Typography>
              )
            }
            
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}


export default LinkPreview;
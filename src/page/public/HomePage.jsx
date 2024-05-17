import React, { useState, useEffect } from "react";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "../../assets/style/HomePage.scss";
import Galerie from "./GaleriePage";
import UploadImages from "../admin/UploadImgPage";

const HomePage = () => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const DiapoImg = [
  //   {
  //     img: "https://woody.cloudly.space/app/uploads/saintlary-tourisme/2022/05/thumbs/nbirrien-paturages-station-ete-vaches-img-7323-640x360.jpg",
  //   },
  //   {
  //     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIESM_QrNs73ljlfTLVdd1kY52u_u1iQGW2g&usqp=CAU",
  //   },
  //   {
  //     img: "https://static.independent.co.uk/2024/01/05/15/newFile-6.jpg?quality=75&width=640&crop=3%3A2%2Csmart&auto=webp",
  //   },
  //   {
  //     img: "https://images.ctfassets.net/wqdtr8q8192q/28KbLkjsWV6G0MV11VfXmE/a2d73238229bfda923152ed30aa905ec/iStock-1353245759.jpg",
  //   },
  // ];

  // const showPrevImage = () => {
  //   if (currentIndex > 0) {
  //     setCurrentIndex(currentIndex - 1);
  //   } else {
  //     alert("C'est la première image !");
  //   }
  // };

  // const showNextImage = () => {
  //   if (currentIndex < DiapoImg.length - 1) {
  //     setCurrentIndex(currentIndex + 1);
  //   } else {
  //     alert("C'est la dernière image !");
  //   }
  // };

  return (
    <>
      <Header />
      <UploadImages/>
      <Galerie />
      {/* <main className="home-page-main">
        <section id="logo">
          <div className="imgContainer">
            <h1>Un Monde de Douceur</h1>
            <img src={img1} alt="bébé" />
          </div>
        </section>

        
          <section id="diaporama">
            <div id="diaporamaContainer">
              <button onClick={showPrevImage} id="imageBtnPrev">
                prev
              </button>
              <div
                id="diaporamaImage"
                style={{
                  backgroundImage: `url(${DiapoImg[currentIndex].img})`,
                }}
              />
              <button onClick={showNextImage} id="imageBtnNext">
                next
              </button>
            </div>
          </section>

         

          <h2>Derniers Commentaires</h2>

          
      </main> */}
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;

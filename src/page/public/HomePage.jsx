import React, { useState, useEffect } from "react";
import Header from "../../components/public/Header";
import Footer from "../../components/public/Footer";
import "../../assets/style/HomePage.scss";
import img1 from "../../assets/img/222.png";
import imgPresentation1 from "../../assets/img/imgProf.png";
import imgBain from "../../assets/img/bainM.jpeg";
import imgMassage from "../../assets/img/bain.jpeg";

const HomePage = () => {
  const [reviews, setReviews] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await fetch(
          "http://localhost:3001/api/reviews"
        );
        const reviewsResponseData = await reviewsResponse.json();
        // Récupérer les 4 dernières critiques
        const latestReviews = reviewsResponseData.slice(-4);
        setReviews(latestReviews);
      } catch (error) {
        console.error("Erreur lors de la récupération des critiques:", error);
      }
    };

    fetchReviews();
  }, []);

  const DiapoImg = [
    {
      img: "https://woody.cloudly.space/app/uploads/saintlary-tourisme/2022/05/thumbs/nbirrien-paturages-station-ete-vaches-img-7323-640x360.jpg",
    },
    {
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIESM_QrNs73ljlfTLVdd1kY52u_u1iQGW2g&usqp=CAU",
    },
    {
      img: "https://static.independent.co.uk/2024/01/05/15/newFile-6.jpg?quality=75&width=640&crop=3%3A2%2Csmart&auto=webp",
    },
    {
      img: "https://images.ctfassets.net/wqdtr8q8192q/28KbLkjsWV6G0MV11VfXmE/a2d73238229bfda923152ed30aa905ec/iStock-1353245759.jpg",
    },
  ];

  const showPrevImage = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      alert("C'est la première image !");
    }
  };

  const showNextImage = () => {
    if (currentIndex < DiapoImg.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      alert("C'est la dernière image !");
    }
  };

  return (
    <>
      <Header />
      <main className="home-page-main">
        <section id="logo">
          <div className="imgContainer">
            <h1>Un Monde de Douceur</h1>
            <img src={img1} alt="bébé" />
          </div>
        </section>

        <section id="Background">
          <article>
            <img src={imgPresentation1} alt="profilpicture" />

            <section>
              <h2>Présentation</h2>
              <p>
                Je suis psychomotricienne depuis de nombreuses années. J’ai
                travaillé auprès d’adultes porteurs de handicap puis
                actuellement après d enfants porteurs de handicap en IME ainsi
                que dans un Ephad auprès de personnes âgées. Souhaitant faire
                évoluer ma pratique et désireuse de travailler auprès des tous
                petits, je me suis formée au Bain des Merveille et aux massages
                bébé. Je suis également formée au Makaton et à l’approche
                Snoezelen. J’ai l’intention de me former davantage ( portage
                physiologique puis sommeil de l enfants et de l adolescents
                prévu en 2024….)pour développer une activité libérale auprès des
                tous petits et de leurs parents .
              </p>
            </section>
          </article>

          <article id="aricle2">
            <section>
              <p>
                Je suis douce et attentive, dynamique et à l’écoute. La notion
                de contenance est très présente dans ma pratique quelque soit la
                population (bain thérapeutique, toucher thérapeutique,
                utilisation de hamac….) Le bain des Merveilles m’est de ce fait
                apparu comme une évidence, un outil préventif d’une extrême
                douceur, contenant pour bébé mais également ses parents. Le
                meilleur moyen de créer une société bienveillante et portant de
                jolie valeur est d’entourer et d’accompagner les parents et leur
                bébé le plus tôt possible. Les ateliers massage bébé permettent
                aux parents de masser régulièrement leur enfant afin de leur
                donner des bases solides de bien-être corporel. Trop d’adultes
                sont aujourd’hui déconnectés de leur corps et se retrouvent avec
                des problèmes de santé important parce qu’ils n’ont pas su
                l’écouter. Apprenons à nos enfants comment écouter leur corps le
                plus tôt possible pour qu’ils sachent en prendre soin toute leur
                vie et ce naturellement !
              </p>
            </section>
            <img src={imgPresentation1} alt="" />
          </article>
        </section>

        <section id="prestation">
          <h2>Prestation</h2>
          <article>
            <img src={imgBain} alt="profilpicture" />

            <section>
              <h4>Le bain des Merveilles </h4>
              <p>
                J’ai été formée au bain des Merveilles par Aurélie Cachan, une
                fantastique infirmière puéricultrice qui après recherche et
                pratique a crée cette technique de bain. Elle est également une
                merveilleuse formatrice, soucieuse de nous transmettre l’essence
                de sa pratique. Le bain des Merveilles est un bain emmailloté
                permettant à bébé de retrouver les sensations de la vie in
                utéro, de la position fœtale et de la naissance, dans une
                atmosphère paisible et douce. Pendant la grossesse et l
                accouchement, bébé vit des tensions corporelles, psychiques et
                émotionnelles, le bain des Merveilles favorise la modification
                de toutes ses mémoires afin que bébé soit libéré d’un maximum de
                ses tensions. Ce bain est une bulle de sérénité et de bien-être
                pour bébé et ses parents, une merveilleuse façon de l
                accueillir! 1h à 1h30 de soin à domicile Matériel fournit Je me
                déplace à votre domicile pour vous faire vivre un moment unique.
                Nous prenons un temps pour échanger autour de la grossesse, de
                la naissance et du retour à la maison. Je vous montre comment
                emmailloter bébé et tout le monde profite ensuite du bain. Si
                vous le souhaitez ce moment de douceur peut se poursuivre par un
                temps de peau à peau. L’idéal est de pratiquer le bain des
                Merveilles lors des 3 premières semaines de vie de bébé. Bébé se
                souvient encore parfaitement de ce qu’il a vécu pendant 9 mois
                lové dans le ventre de sa maman. Vous aurez alors un aperçu de
                ce que votre tout petit vivait lors de cette symbiose. Au delà
                de 3 semaines, je vous proposerai plutôt un bain enveloppé où je
                rechercherai à détendre au maximum votre tout petit. Le bain
                enveloppé est possible jusqu’à 6 semaines environ. N’attendez
                pas d’avoir accouché pour me contacter, je répondrai avec
                plaisir à toutes vos questions.
              </p>
            </section>
          </article>
          <article>
            <img src={imgMassage} alt="profilpicture" />

            <section>
              <h4>Le massage bébé</h4>
              <p>
                Je vous propose des ateliers massage pour que vous appreniez à
                masser votre bébé. Les ateliers se font à domicile en individuel
                ou à plusieurs si vous avez des amis également intéressés. Les
                deux parents sont conviés à l’atelier pour apprendre ensemble
                les gestes de massage. Pour apprendre à masser l ensemble du
                corps de votre bébé, il est nécessaire de réaliser 4 séance
                d’environ 1 h. 1 séance découverte 2 séance soulager et apaiser
                les maux 3 séance apaiser les pleurs 4 favoriser la motricité
                Les gestes de massage vous seront montrés sur un poupon pour que
                vous puissiez ensuite les reproduire sur votre bébé. Les séances
                se font au rythme de votre bébé et en tenant compte de sa
                disponibilité. Un ensemble de documents ainsi qu’un accès à une
                application pour travailler seul chez vous les mouvements, vous
                est remis après chaque atelier. Pourquoi masser votre bébé ? Les
                bienfaits du massage sont maintenant prouvés scientifiquement
                mais le massage existe depuis la nuit des temps dans toutes les
                cultures. La culture occidentale a juste perdue cette habitude
                si importante. De plus le toucher est sens qui se développe en
                premier chez le fœtus et qui perdure le plus longtemps dans le
                grand âge. On imagine alors plus facilement toute son
                importance. Le massage favorise Le lien d’attachement Bébé est
                sécurisé par le contact avec ses parents. L’attention qu’on lui
                porte favorise son développement et lui donne des bases solides
                pour construire sa confiance en lui et en l’autre. La
                stimulation Le toucher active l’ensemble des systèmes vitaux de
                bébé (circulatoire, digestif, hormonal, immunitaire….) Bébé
                prend ainsi conscience de tout son corps et de ses limites
                corporelles. Il construit son schéma corporel de façon saine et
                sécure. Le soulagement Le massage soulage les maux digestifs (
                gaz, coliques, constipation….) Il soulage les douleurs en
                général. La détente Les massages réalisés régulièrement apaisent
                bébé et favorise son sommeil. Ils lui permettent une meilleure
                régulation tonique et l’aide à être connecté à ses ressentis
                corporels. Une meilleure régulation des hormones de stress est
                observée ainsi qu’une augmentation de l’hormone du bien être.
                Bébé profite d’un shoot d’ocytocine et ses parents aussi! Les
                parents en effet apprennent à connaître leur enfant, gagnent en
                confiance et en sérénité. La lactation est stimulée chez les
                mamans et les complications du post partum sont diminuées.
                Toutes les raisons sont bonnes pour vous former au massage bébé
                alors n’hésitez pas!
              </p>
            </section>
          </article>
          <br />

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

          {reviews ? (
            <>
              <section id="sectionReviewMain">
                {reviews.map((review) => (
                  <article id="reviewMain" key={review.id}>
                    <p>{review.content}</p>

                    {review.User && (
                      <p>
                        Par {review.User.username}, publié le{" "}
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </article>
                ))}
              </section>
            </>
          ) : (
            <p>En cours de chargement</p>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;

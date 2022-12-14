import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useRef } from 'react';

import './Page.css';

const Page: React.FC = () => {
  const username = useRef<HTMLIonInputElement>(null);
  const findUser = async () => {
    console.log(username.current?.value)
    const inf = await fetch("https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + username.current?.value + "?api_key=" + process.env.REACT_APP_RIOT_API, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0",
        "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      }
    }).then(res => res.json())
    console.log(inf)

    const res = await fetch("https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/" + inf.id + "?api_key=" + process.env.REACT_APP_RIOT_API, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:107.0) Gecko/20100101 Firefox/107.0",
        "Accept-Language": "ko-KR,ko;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
      }
    }).then(res => res.json())

    console.log(res)


  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">전적 검색</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonItem>
          <IonInput ref={username} placeholder='소환사 이름'/>
        </IonItem><br/>
        <IonButton expand={"block"} onClick={findUser}>검색</IonButton>
        
      </IonContent>
    </IonPage>
  );
};

export default Page;

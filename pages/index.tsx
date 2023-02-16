import api from "@/services/axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { TbTemperature } from 'react-icons/tb';

import { PropagateLoader } from "react-spinners";
import Image from "next/image";

import garrafa from '@/assets/garrafa.png'

interface TemperatureProps {
  Temperature: string;
  Time: string;
  id: string;
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [suggestion, setSuggestion] = useState("");
  const [temperature, setTemperature] = useState<TemperatureProps>({
    Temperature: "?",
    Time: "?",
    id: "?",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      api
        .get("/Temperatura/Receber")
        .then((response) => {
          setLoading(true);
          setTemperature(response.data);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const temp = parseFloat(temperature.Temperature)

    if (temp < 26) {
      setSuggestion("Cerveja estupidamente gelada, famosa canela de pedreiro, estalando!")
    } else if (temp > 30 && temp < 35) {
      setSuggestion("Cerveja está esquentando, acho que está na hora de oferecer outra cerveja!")
    } else {
      setSuggestion("Cerveja quente ou possivelmente vazia, ta fazendo chá?")
    }
  }, [temperature.Temperature])


  return (
    <>
      {!loading ? (
        <Container>
          <Header>
            <h1>Status da garrafa</h1>
            <p>{temperature.id}</p>
          </Header>

          <Image
            src={garrafa}
            alt="Picture of the bottle"
            width={220}
            height={370}
            priority
          />

          <Temperature>
            <div>
              <TbTemperature size='2em' />
              <p>Temperatura</p>
            </div>
            <h1>{temperature.Temperature}°C</h1>
          </Temperature>

          <Suggestion>
            <h1>Sugestão</h1>
            <p>{suggestion}</p>
          </Suggestion>
        </Container>
      ) : (
        <ContainerSpinner>
          <PropagateLoader color="#FFC727" />
        </ContainerSpinner>
      )}
    </>
  );
}

export const ContainerSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

export const Container = styled.div`
  margin: 0 auto;
  max-width: 390px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  gap: 1rem;

  font-family: "Inter", sans-serif;
`;

export const Header = styled.div`
    width: 100%;

    h1 {
    font-weight: 600;
    font-size: 2rem;
    color: #2C2C2C;
  }

  p {
    font-weight: 400;
    font-size: 1rem;
    color: #838383;
  }
`;

export const Temperature = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: .5rem;

    p {
      font-weight: 400;
      font-size: 1rem;
      color: #2C2C2C;
  }

    h1 {
      font-weight: 400;
      font-size: 1.5rem;
      color: #2C2C2C;
  }
}
`;

export const Suggestion = styled.div`
  width: 100%;

  h1 {
    font-weight: 600;
    font-size: 2rem;
    color: #2C2C2C;
  }

  p {
    font-weight: 400;
    font-size: 1rem;
    color: #838383;
  }
`;

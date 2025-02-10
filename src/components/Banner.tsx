import { FC } from "react";
import { Container } from "./Container";

export const Banner: FC = () => (
  <Container className="flex flex-col py-0 pb-7 max-lg:px-0">
    <h1 className="font-bold text-[200px] text-center border-t border-b max-lg:px-3 max-[1240px]:text-[150px] max-md:text-[100px] max-[570px]:text-[80px]  max-[450px]:text-[65px] max-[450px]:leading-[90px] ">
      THE BLOG
    </h1>
  </Container>
);

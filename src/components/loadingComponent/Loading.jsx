import styled from "styled-components";
import Loader from "react-loader-spinner";
const LoaderContainer = styled.div`
  margin-top: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingSnipper = () => {
  return (
    <LoaderContainer>
      <Loader
        type="TailSpin"
        style={{ margin: "auto" }}
        color="#000"
        height={150}
        width={150}
      />
    </LoaderContainer>
  );
};

export default LoadingSnipper;

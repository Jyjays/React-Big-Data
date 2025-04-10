import styled from 'styled-components';

export const RightPage = styled.div`
  width: 7.25rem;
  height: auto;
  padding: 0px 0.2rem;
`;

export const RightTopBox = styled.div`
  position: relative;
  height: 6.5rem;
  width: 100%;
  .right-bottom-borderBox13 {
    width: inherit;
    height: inherit;
    padding: 0.25rem 0.1875rem;
    .right-bottom {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      margin-right: 3rem;
      width: 6.5rem;
      background-color: rgba(19, 25, 47, 0.6);
      .feedback-box {
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        &-item {
          display: flex;
          align-items: center;
          flex-direction: column;
          height: 1.75rem;
          .dis-text {
            font-weight: bold;
            margin-top: 0.0625rem;
            color: #b2cfee;
            font-size: 0.2rem;
            background: linear-gradient(to bottom, #fff, #6176F4);
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
          }
        }
      }
      .offline-portal-box {
        margin-top: 0.125rem;
      }
    }
  }
`;


export const RightBottomBox = styled.div`
  position: relative;
  height: 6rem;
  width: 100%;
  .right-bottom-borderBox13 {
    width: inherit;
    height: inherit;
    padding: 0.25rem 0.1875rem;
    .right-bottom {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      .feedback-box {
        margin-top: 0.1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        &-item {
          display: flex;
          align-items: center;
          flex-direction: column;
          height: 1.75rem;
          .dis-text {
            font-weight: bold;
            margin-top: 0.0625rem;
            color: #b2cfee;
            font-size: 0.2rem;
            background: linear-gradient(to bottom, #fff, #6176F4);
            color: transparent;
            -webkit-background-clip: text;
            background-clip: text;
          }
        }
      }
      .offline-portal-box {
        margin-top: 0.125rem;
      }
    }
  }
`;

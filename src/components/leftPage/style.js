import styled from 'styled-components';

export const LeftPage = styled.div`
  width: 7.25rem;
  height: auto;
  padding: 0.2rem;
  padding-bottom: 0px;
`;

export const LeftTopBox = styled.div`
  position: relative;
  height: 6.25rem;
  width: 100%;
  .left-top-borderBox12 {
    width: inherit;
    height: inherit;
    padding: 0.1875rem;
    .left-top {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      .title-dis {
        margin-top: 0.1875rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.2rem;
        color: #c0c9d2;
        &-keyword {
          padding-left: 0.125rem;
          color: #47dae8;
        }
      }
    }
  }
`;
export const LeftBottomBox = styled.div`
  position: relative;
  height: 6rem;
  width: 100%;
  .left-top-borderBox12 {
    width: inherit;
    height: inherit;
    padding: 0.1875rem;
    .left-top {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      background-color: rgba(19, 25, 47, 0.6);
      .title-dis {
        margin-top: 0.1875rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 0.2rem;
        color: #c0c9d2;
        &-keyword {
          padding-left: 0.125rem;
          color: #47dae8;
        }
      }
    }
  }
`;
export const ScatterChartBox = styled.div`
  width: 100%; 
  height: 5rem;
  margin: 0 auto;
  padding: 0.125rem;
  position: relative;
`;

export const PieChartBox = styled.div`
  width: 100%;
  height: 5rem; /* 为扇形图定义高度 */
  margin: 0 auto;
  padding: 0.125rem;
  position: relative;
`;
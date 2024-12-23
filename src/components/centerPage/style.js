import styled from 'styled-components';

export const CenterPage = styled.div`
  margin-top: 0.25rem;
  display: flex;
  width: 10rem;
  height: 100%
  flex-direction: column;
  align-items: center;
`;

export const CenterBottom = styled.div`
  display: flex;
  margin-bottom: 0.25rem;
  margin-top: 0.875rem;
  bottom: 0;
  width: 100%;
  .center-bottom-borderBox13 {
    width: inherit;
    height: inherit;
    padding: 0.25rem 0.1875rem;
    .center-bottom {
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

  .detail-list {
    width: 100%; /* 确保宽度充满容器 */
    // text-align: center; /* 确保文本对齐 */
    color: #bcdcff;
    font-size: 0.15rem;
    background: rgba(19, 25, 47, 0.8);
    border-radius: 8px;

    &-header,
    &-item {
      display: flex;
      justify-content: space-between; /* 平均分布列 */
      padding: 0.2rem 0;
      border-bottom: 1px solid #343f4b;
      text-align: center;
    }

    &-header span,
    &-item span {
      flex: 1; /* 确保列等宽 */
      text-align: center;
    }

    &-empty {
      text-align: center;
      padding: 1rem;
      color: #bcdcff;
      font-size: 0.3rem;
    }

    /* Add the following styles for the scrollable section */
    &-scroll {
      max-height: 2rem;  /* Limit the maximum height */
      overflow-y: auto;   /* Enable vertical scrolling */
    }

    &-scroll::-webkit-scrollbar {
      display: none; /* Hide the scrollbar */
    }
  }
`;

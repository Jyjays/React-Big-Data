import request from '../utils/request';


export const getLeftPageData = async () => {
  return request('/api/leftPageData').then(response => {
    return response.data;
  });
};

export const getCenterPageData = async () => {
  return request('/api/centerPageData').then(response => {
    return response.data;
  });
};

export const getRightPageData = async () => {
  return request('/api/rightPageData').then(response => {
    return response.data;
  });
};

import { useCallback, useState } from "react";

import axios from "axios";

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const initializeError = () => {
    setError(null);
    setIsLoading(false);
  };

  const sendPostRequest = async (url, data) => {
    setIsLoading(true);

    try {
      const response = await axios.post(url, data);
      const responseData = await response.data;

      setIsLoading(false);

      return responseData;
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류 발생. 확인 바람.");
      }
      setIsLoading(false);
    }
  };

  const sendGetRequest = useCallback(async (url, data) => {
    setIsLoading(true);

    try {
      const response = await axios.get(url, data);
      const responseData = await response.data;

      setIsLoading(false);

      return responseData;
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError(
          "일시적으로 데이터를 불러올 수 없습니다. 나중에 다시 시도해주세요."
        );
      }
      setIsLoading(false);
    }
  }, []);

  const sendPatchRequest = async (url, data) => {
    setIsLoading(true);

    try {
      const response = await axios.patch(url, data);
      const responseData = await response.data;

      setIsLoading(false);

      return responseData;
    } catch (err) {
      if (err.message) {
        setError(err.message);
      } else {
        setError("알 수 없는 오류 발생. 확인 바람.");
      }
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    initializeError,
    sendPostRequest,
    sendGetRequest,
    sendPatchRequest,
  };
};

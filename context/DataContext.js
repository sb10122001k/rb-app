import { useEffect, useState, createContext } from "react";
import { base_url } from "../constant";
import { storage } from "../utils/storage";
import axios from "axios";
import io from 'socket.io-client';

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const token = storage.getString('token');

  useEffect(() => {
    const fetchTodayData = async () => {
      try {
        const response = await axios.get(`${base_url}/data/todayData`, {
          headers: {
            'token': token
          }
        });
        const data= response.data
        setTemperatureData(data.data.map(item => ({
          id: item.id,
          value: item.temperature,
          dataPointText: item.temperature.toString().slice(0, 5),
          label: new Date(item.timestamp).toLocaleTimeString()
        })));
        setPressureData(data.data.map(item => ({
          id: item.id,
          value: item.pressure,
          dataPointText: item.pressure.toString().slice(0, 5),
          label: new Date(item.timestamp).toLocaleTimeString()
        })));
        setHumidityData(data.data.map(item => ({
          id: item.id,
          value: item.humidity,
          dataPointText: item.humidity.toString().slice(0, 5),
          label: new Date(item.timestamp).toLocaleTimeString()
        })));
      } catch (error) {
        console.error('Error fetching today\'s data:', error);
      }
    };

    fetchTodayData();

    const socket = io(`${base_url}`, {
      query: { token }
    });

    socket.on('connect', () => {
      console.log("Connection successfully established");
    });

    socket.on('newData', (data) => {
      console.log(data, "Data");
      const timeLabel = new Date(data.timestamp).toLocaleTimeString();

      // Append new data to the existing state
      setTemperatureData(prevData => [
        ...prevData,
        { id: data.id, value: data.temperature, dataPointText: data.temperature.toString().slice(0, 5), label: timeLabel }
      ]);

      setPressureData(prevData => [
        ...prevData,
        { id: data.id, value: data.pressure, dataPointText: data.pressure.toString().slice(0, 5), label: timeLabel }
      ]);

      setHumidityData(prevData => [
        ...prevData,
        { id: data.id, value: data.humidity, dataPointText: data.humidity.toString().slice(0, 5), label: timeLabel }
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <DataContext.Provider value={{ temperatureData, pressureData, humidityData }}>
      {children}
    </DataContext.Provider>
  );
};

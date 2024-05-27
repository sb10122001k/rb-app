import React, { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { DataContext } from '../context/DataContext';
import CustomHeader from '../components/headerComponet';

const PressureScreen = () => {
  const { pressureData } = useContext(DataContext);
  const { width: screenWidth } = Dimensions.get('window');


  return (
    <View style={{
      flex: 1, alignItems: 'center', backgroundColor: 'black', width: '100%'
    }}>
      <CustomHeader />
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Pressure</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: 'center', height: '100%' }}>
        <View style={styles.container}>
          <LineChart
            data={pressureData}
            width={screenWidth*0.85}
            height={200}
            spacing={60}
            initialSpacing={50}
            endSpacing={60}          
            scrollToEnd={true}
            color="#40E0D0"
            hideRules={true}
            xAxisColor="white"
            yAxisColor="white"
            textColor1="white"
            textShiftY={-8}
            textShiftX={-10}
            xAxisThickness={2}
            yAxisThickness={2}
            curved
            isAnimated
            xAxisLabelTextStyle={{ color: 'white', fontSize: 10 }}
            yAxisLabelTextStyle={{ color: 'white', fontSize: 10 }}
            noOfSections={10}
            stepValue={150}
            maxValue={1500}
            rulesColor="lightgrey"
            yAxisTextStyle={{ color: 'white', fontSize: 10 }}
            xAxisTextStyle={{ color: 'white', fontSize: 10 }}
            xAxisLabelTexts={Array.from({ length: 1440 }, (_, i) => {
              const hours = Math.floor(i / 60).toString().padStart(2, '0');
              const minutes = (i % 60).toString().padStart(2, '0');
              return `${hours}:${minutes}`;
            })}
            adjustToWidth={true}
            dataPointLabelComponent={({ item }) => (
              <View style={styles.dataPointLabel}>
                <Text style={styles.dataPointText}>{item.value}</Text>
              </View>
            )}
          />
        </View>

      </View>


    </View>
  );
};

export default PressureScreen;

const styles = StyleSheet.create({
  container: {
  },
  dataPointLabel: {
    position: 'absolute',
    backgroundColor: 'orange',
  },
  dataPointText: {
    color: 'white',
    fontSize: 10,
  },
})
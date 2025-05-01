import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import WebView from 'react-native-webview';

const ws = Dimensions.get('screen').width / 440

const InstructionComponent = ({url, steps}) => {
  const [timers, setTimers] = useState(
    steps.map(() => ({time: 0, running: false})),
  );

  const startTimer = (index, duration) => {
    setTimers(prev =>
      prev.map((timer, i) =>
        i === index ? {time: duration, running: true} : timer,
      ),
    );

    const interval = setInterval(() => {
      setTimers(prev =>
        prev.map((timer, i) =>
          i === index ? {...timer, time: Math.max(timer.time - 1, 0)} : timer,
        ),
      );
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setTimers(prev =>
        prev.map((timer, i) =>
          i === index ? {...timer, running: false} : timer,
        ),
      );
    }, duration * 1000);
  };

  return (
    <View style={styles.container}>
      <WebView
          source={{ uri: url.replace("watch?v=", "embed/") }}
          style={styles.instruction_video}
          allowsFullscreenVideo={true}
      />
      <Text style={styles.title}>Hướng dẫn</Text>
      <Text style={styles.subtitle}>{steps.length} bước</Text>

      <View>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            {/* Hiển thị số thứ tự và mô tả bước */}
            <Text style={styles.text}>
              {`${step.step_number}. ${step.description}`}
            </Text>

            {/* Nút hẹn giờ */}
            <TouchableOpacity
              style={styles.timerButton}
              onPress={() => startTimer(index, step.duration)}
              disabled={timers[index]?.running} // Kiểm tra tránh lỗi undefined
            >
              <Text style={styles.timerButtonText}>
                {timers[index]?.running
                  ? `⏳ ${timers[index].time}s`
                  : `🕒 Hẹn giờ (${step.duration})`}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  instruction_video: {
    width: '100%',
    height: ws*180,
    marginBottom: ws*20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  timerButton: {
    backgroundColor: '#70B9BE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  timerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InstructionComponent;

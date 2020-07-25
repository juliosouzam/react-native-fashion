import React, { useRef } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { multiply } from 'react-native-reanimated';
import { interpolateColor, onScrollEvent, useValue } from 'react-native-redash';

import Slide, { SLIDER_HEIGHT } from './Slide';
import Subslide from './Subslide';

const { width } = Dimensions.get('window');

const BORDER_RADIUS = 75;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: SLIDER_HEIGHT,
    borderBottomRightRadius: BORDER_RADIUS,
  },
  footer: { flex: 1 },
  footerContent: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderTopLeftRadius: BORDER_RADIUS,
  },
});

const slides = [
  {
    title: 'Relaxed',
    subtitle: 'Find Your Outfits',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    color: '#bfeaf5',
  },
  {
    title: 'Playful',
    subtitle: 'Hear it First, Wear it First',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    color: '#beecc4',
  },
  {
    title: 'Excentric',
    subtitle: 'Your style, Your Way',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    color: '#ffe4f9',
  },
  {
    title: 'Funky',
    subtitle: 'Look Good, Feel Good',
    description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit.',
    color: '#ffdddd',
  },
];

const Onboarding: React.FC = () => {
  const scrollRef = useRef<Animated.ScrollView>(null);

  const x = useValue(0);
  const onScroll = onScrollEvent({ x });
  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          {...{ onScroll }}
        >
          {slides.map(({ title }, index) => (
            <Slide key={index} label={title} right={!!(index % 2)} />
          ))}
        </Animated.ScrollView>
      </Animated.View>

      <View style={styles.footer}>
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, backgroundColor }}
        />

        <Animated.View
          style={[
            styles.footerContent,
            {
              width: width * slides.length,
              transform: [
                {
                  translateX: multiply(x, -1),
                },
              ],
            },
          ]}
        >
          {slides.map(({ subtitle, description }, index) => (
            <Subslide
              onPress={() => {
                if (scrollRef.current) {
                  scrollRef.current
                    .getNode()
                    .scrollTo({ x: width * (index + 1), animated: true });
                }
              }}
              key={index}
              last={index === slides.length - 1}
              {...{ subtitle, description }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;

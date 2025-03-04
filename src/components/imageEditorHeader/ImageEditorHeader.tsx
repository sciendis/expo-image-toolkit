import { Colors } from '@/styles';
import { getExpoConstants } from '@/utils';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import { Surface, Title } from 'react-native-paper';

type Props = {
  title: string;
  headerRight?: JSX.Element;
  headerLeft?: JSX.Element;
  onLayout?: (event: LayoutChangeEvent) => void;
};

export const ImageEditorHeader = function ({
  title,
  headerLeft,
  headerRight,
  onLayout,
}: Props) {
  const { statusBarHeight } = getExpoConstants();
  return (
    <Surface
      onLayout={onLayout}
      style={[styles.container, { marginTop: statusBarHeight }]}
    >
      <View style={styles.headerItem}>{headerLeft}</View>
      <View style={[styles.headerItem, styles.headerCenter]}>
        <Title style={styles.headerTitle}>{title}</Title>
      </View>
      <View style={[styles.headerItem, styles.headerRight]}>{headerRight}</View>
    </Surface>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.background,
  },
  headerItem: {
    marginHorizontal: 10,
    padding: 4,
    flex: 1,
  },
  headerCenter: {
    padding: 0,
    borderRadius: 20,
    backgroundColor: Colors.lightGrayTransparent,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
});

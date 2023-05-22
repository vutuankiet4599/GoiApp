import {
  ListItem,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  Icon,
  Button,
  Text,
} from "@react-native-material/core";
import { useState } from "react";

export const Item = ({ value }) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <ListItem
        title={value.word}
        secondaryText={value.definitions.join("; ")}
        trailing={(props) => <Icon name="eye" {...props} />}
        onPress={() => setVisible(true)}
      />
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <DialogHeader title={value.word} />
        <DialogContent>
          {value.definitions.map((definition, index) => (
            <Text key={index}>{definition}</Text>
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            title="Cancel"
            compact
            variant="text"
            onPress={() => setVisible(false)}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

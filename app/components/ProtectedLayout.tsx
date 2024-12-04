import { Text, StyleSheet } from "react-native";
import { useAuthGuard } from "../hooks/useAuthGuard";
import { View } from "tamagui";

interface ProtectedLayoutProps {
	children: React.ReactNode;
}

export function ProtectedLayout({ children }: ProtectedLayoutProps) {
	const { loading, user } = useAuthGuard();

	if (loading) {
		return (
			<View backgroundColor="$background" style={styles.container}>
				<Text>Loading...</Text>
			</View>
		);
	}

	return <>{children}</>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

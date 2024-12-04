import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { ProtectedLayout } from "../components/ProtectedLayout";

export default function EstablishmentLayout() {
	return (
		<ProtectedLayout>
			<Tabs
				screenOptions={{
					headerShown: false,
				}}>
				<Tabs.Screen
					name="index"
					options={{
						title: "Início",
						tabBarActiveTintColor: "black",
						tabBarIcon: ({ color }) => (
							<FontAwesome name="home" size={24} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="config"
					options={{
						title: "Configurações",
						tabBarActiveTintColor: "black",
						tabBarIcon: ({ color }) => (
							<FontAwesome name="cog" size={24} color={color} />
						),
					}}
				/>
			</Tabs>
		</ProtectedLayout>
	);
}

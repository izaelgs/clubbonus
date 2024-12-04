import { useEffect, useState } from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
import { useAuthGuard } from "../hooks/useAuthGuard";
import {
  YStack,
  Text,
  Input,
  Button,
  ScrollView,
  TextArea,
  Form,
  Spinner,
} from "tamagui";
import { establishmentService } from "../services/establishmentService";

interface EstablishmentData {
  name: string;
  description: string;
  logoUrl: string;
  bannerUrl: string;
}

export default function EstablishmentConfig() {
  const { establishment, setEstablishment } = useAuthGuard();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<EstablishmentData>({
    name: "",
    description: "",
    logoUrl: "",
    bannerUrl: "",
  });

  useEffect(() => {
    if (establishment) {
      setFormData({
        name: establishment.name,
        description: establishment.description || "",
        logoUrl: establishment.logo_url || "",
        bannerUrl: establishment.banner_url || "",
      });
    }
  }, [establishment]);

  const handleSave = async () => {
    try {
      setLoading(true);
      
      const updatedEstablishment = await establishmentService.updateEstablishment({
        name: formData.name,
        description: formData.description,
        logo_url: formData.logoUrl,
        banner_url: formData.bannerUrl,
      });

      setEstablishment(updatedEstablishment);
      
      // Show success message or toast here
      console.log("Estabelecimento atualizado com sucesso!");
    } catch (error) {
      // Show error message or toast here
      console.error("Erro ao atualizar estabelecimento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        flex={1}
        padding="$4"
        bounces={false}
      >
        <Form onSubmit={handleSave}>
          <YStack space="$4">
            <Text
              textAlign="center"
              fontSize="$8"
              fontWeight="bold"
              marginTop="$5"
              color="black"
            >
              Configuração do Estabelecimento
            </Text>

            <Text fontSize="$5" fontWeight="500" color="black">
              Informe os dados do seu estabelecimento para que os clientes possam
              encontrá-lo.
            </Text>

            <YStack space="$2">
              <Text fontSize="$5" fontWeight="500" color="black">
                Nome
              </Text>
              <Input
                size="$4"
                borderWidth={1}
                borderRadius="$4"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                placeholder="Digite o nome do estabelecimento"
                backgroundColor="white"
                color="black"
                disabled={loading}
              />
            </YStack>

            <YStack space="$2">
              <Text fontSize="$5" fontWeight="500" color="black">
                Descrição
              </Text>
              <TextArea
                size="$4"
                borderWidth={1}
                borderRadius="$4"
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                placeholder="Digite a descrição do estabelecimento"
                minHeight={100}
                numberOfLines={4}
                backgroundColor="white"
                color="black"
                disabled={loading}
              />
            </YStack>

            <YStack space="$2">
              <Text fontSize="$5" fontWeight="500" color="black">
                URL do Logo
              </Text>
              <Input
                size="$4"
                borderWidth={1}
                borderRadius="$4"
                value={formData.logoUrl}
                onChangeText={(text) =>
                  setFormData({ ...formData, logoUrl: text })
                }
                placeholder="Digite a URL do logo"
                backgroundColor="white"
                color="black"
                disabled={loading}
              />
            </YStack>

            <YStack space="$2">
              <Text fontSize="$5" fontWeight="500" color="black">
                URL do Banner
              </Text>
              <Input
                size="$4"
                borderWidth={1}
                borderRadius="$4"
                value={formData.bannerUrl}
                onChangeText={(text) =>
                  setFormData({ ...formData, bannerUrl: text })
                }
                placeholder="Digite a URL do banner"
                backgroundColor="white"
                color="black"
                disabled={loading}
              />
            </YStack>

            <Button
              backgroundColor="$black"
              color="white"
              size="$4"
              marginTop="$4"
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? (
                <Spinner color="white" />
              ) : (
                "Salvar Alterações"
              )}
            </Button>
          </YStack>
        </Form>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

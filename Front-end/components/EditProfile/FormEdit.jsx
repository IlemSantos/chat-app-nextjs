import { Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea, useToast, VStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";

export default function FormEdit() {
  const { handleSubmit, register, formState: { errors } } = useForm()
  const toast = useToast()

  async function handleSignUp(data) {
    const res = await api.post("/auth/user", {
      name: data.name,
      pronouns: data.pronouns,
    })

    if (res.data) {
      toast({
        title: "Save Changes",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <VStack width="full" maxW="lg" height="full" alignItems={["center", "center", "flex-start", "flex-start"]}>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <FormControl isInvalid={errors.name} mb={6}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input {...register('name', {
            required: 'This is required',
          })} id="name" name="name" type="text" />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.pronouns} mb={6}>
          <FormLabel htmlFor="pronouns">Pronouns</FormLabel>
          <Textarea {...register('pronouns', {})} id="pronouns" name="pronouns" type="text" />
          <FormErrorMessage>
            {errors.pronouns && errors.pronouns.message}
          </FormErrorMessage>
        </FormControl>

        <Button width="100%" mt={4} borderRadius={"100vh"} colorScheme="teal" type="submit">Save Changes</Button>
      </form>
    </VStack>
  )
}
import { useContext } from 'react'
import { Button, Divider, Flex, FormControl, FormErrorMessage, FormLabel, Heading, Input, useToast } from "@chakra-ui/react"
import { parseCookies } from 'nookies'
import { useForm } from "react-hook-form"
import { AuthContext } from '../contexts/AuthContext'
import { api } from "../services/api";
import { getAPIClient } from '../services/axios'


export default function Update() {
  const { user } = useContext(AuthContext)

  const { handleSubmit, register, formState: { errors }, } = useForm()
  const toast = useToast()

  async function onSubmit(props) {
    const res = await api.post("/auth/user", {
      image: props.image,
      password: props.password,
    })

    if (res.data) {
      toast({
        title: "Account Update",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Flex height="100vh">
        <Flex direction="column" p={12} rounded={6}>
          <Heading mb={6}>Update</Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.image} mb={2}>
              <FormLabel htmlFor="image">Avatar</FormLabel>
              <Input {...register('image', {})} id="image" name="image" type="text" />
              <FormErrorMessage>
                {errors.image && errors.image.message}
              </FormErrorMessage>
            </FormControl>

            <Divider my={4} />

            <FormControl isInvalid={errors.password} mb={2}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input {...register('password', {
                minLength: { value: 4, message: 'Minimum length should be 4' },
              })} id="password" name="password" type="password" />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button width="100%" mt={4} borderRadius={"100vh"} colorScheme="teal" type="submit">Update</Button>
          </form>
        </Flex>
      </Flex>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
  const apiClient = getAPIClient(ctx);
  const { ['nextauth.access_token']: access_token } = parseCookies(ctx)

  if (!access_token) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      }
    }
  }

  await apiClient.get('/auth/user')

  return {
    props: {}
  }
}
import { ChevronDownIcon, LogOutIcon } from "lucide-react"

import Logo from "@/assets/images/logo.svg"
import { useAuthContext } from "@/context/auth"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const Header = () => {
  const { user, signOut } = useAuthContext()
  return (
    <Card>
      <CardContent className="flex items-center justify-between px-8 py-4">
        <div>
          <img src={Logo} alt="Fintrack" />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline" className="space-x-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" />
                  <AvatarFallback>
                    {user.first_name[0]}
                    {user.last_name[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm">
                  {user.first_name} {user.last_name}
                </p>
                <ChevronDownIcon />
              </Button>
              <DropdownMenuContent>
                <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    size="small"
                    className="w-full justify-items-start"
                    onClick={signOut}
                  >
                    <LogOutIcon /> Sair
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenuTrigger>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

export default Header


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChangeEvent, ChangeEventHandler, ReactNode, useEffect, useState } from "react"
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { Earth, Lock } from "lucide-react";
import { PlaylistAccessibility } from "@/app/api/types/playlist.type";
import { useAddPlaylistMutation } from "@/app/api/playlist/playlist-api-slice";
import { addPlayList } from "@/app/api/playlist/playlist-slice";
import { toast } from "@/hooks/use-toast";
import { useDispatch } from "react-redux";
 
export type AddPlaylistDialogProps = {
    children: ReactNode,
};

export function AddPlaylistDialog(props: AddPlaylistDialogProps) {
    const {children} = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [accessibility, setAccessibility] = useState<PlaylistAccessibility>(PlaylistAccessibility.PUBLIC);
    const [isOpening, setIsOpening] = useState(false);
    const [nameErrorMsg, setNameErrorMsg] = useState('');
    const [addListMutation, {isSuccess, isLoading, data}] = useAddPlaylistMutation();
    const dispatch = useDispatch();

    const onNameChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNameErrorMsg('');
        setName(e.target.value);
    };

    const onDescriptionChange: ChangeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const onAccessibilityChange = (value: string) => {
        setAccessibility(value as PlaylistAccessibility);
    }

    const onCreateClick = () => {
        if(!name.trim()) {
            return setNameErrorMsg('Name is required!')
        }

        addListMutation({
            name,
            description,
            accessibility
        });
    };

    useEffect(() => {
        if(!isSuccess)
            return;
        dispatch(addPlayList(data.data!));
        toast({
            title: 'Success',
            description: `Added ${name} playlist 🍿`,
        });
        setIsOpening(false);
    }, [isSuccess, data]);

  return (
    <Dialog open={isOpening} onOpenChange={setIsOpening}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Create new playlist</DialogTitle>
          <DialogDescription>
            Fill out the form the create new dialog
          </DialogDescription>
        </DialogHeader>
        <div className="my-6 px-8 grid gap-y-4">
            <div className="grid gap-y-2">
                <Label htmlFor="name" className="text-sm">Name (required)</Label>
                <Input id="name" value={name} onChange={onNameChange}/>
                <p className="text-xs text-red-500">{nameErrorMsg}</p>
            </div>
            <div className="grid gap-y-2">
                <Label className="text-sm">Description</Label>
                <Input id="description" value={description} onChange={onDescriptionChange}/>
            </div>
            <div className="grid gap-y-2 w-full grid-1">
                <Label className="text-sm">Accessibility</Label>
                <Select value={accessibility} onValueChange={onAccessibilityChange}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="!w-full">
                        <SelectGroup className="!w-full">
                            <SelectItem value="public" className="!w-full">
                                <div className="flex justify-between items-center gap-8">
                                    <Earth className="w-6" />
                                    <p>Public</p>
                                </div>
                            </SelectItem>
                            <SelectItem value="private" className="!w-full">
                                <span className="flex justify-between items-center gap-8">
                                    <Lock className="w-6"/>
                                    <p>Private</p>
                                </span>
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                    </Select>
            </div>
        </div>
        <DialogFooter className="w-full flex justify-around !flex-row items-center sm:justify-around">
            <DialogClose>
                <Button variant="secondary">
                    Close
                </Button>
            </DialogClose>
            <Button variant="secondary" onClick={onCreateClick} className={`${isLoading ? 'pointer-events-none' : ''}`}>
                    Create
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
};
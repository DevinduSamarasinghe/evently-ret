import React, { startTransition, useEffect, useState } from 'react'
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger} from "@/components/ui/alert-dialog"
import { ICategory } from '@/lib/database/models/category.model'
import { Input } from '../ui/input'
import { createCategory, getAllCategories } from '@/lib/actions/category.actions'

type DropDownProps = {
    onChangeHandler?: () => void,
    value?: string
}

const DropDown = ({ onChangeHandler, value }: DropDownProps) => {

    const [categories, setCategories] = useState<ICategory[]>([]);
    const [newCategory, setNewCategory] = useState<string>('');
    
    const handleAddCategory = ()=>{
        createCategory({
            categoryName: newCategory.trim()
        }).then((category)=>{

            //When done it this way, it will at that moment update everything
            setCategories((prevState)=>[...prevState, category]);
        })
    }

    useEffect(()=>{
        const getCategories = async()=>{
            const categoryList = await getAllCategories();
            categoryList && setCategories(categoryList as ICategory[]);
        }
        getCategories();
    },[])

    return (
        <div>
            <Select onValueChange={onChangeHandler} defaultValue={value}>
                <SelectTrigger className="select-field">
                    <SelectValue placeholder="Category "/>
                </SelectTrigger>
                <SelectContent className='rounded-3xl'>
                    {categories.length > 0 && categories.map((category) => (
                        <SelectItem key={category._id} value={category._id} className='select-item p-regular-14 rounded-3xl'>
                            {category.name}
                        </SelectItem>
                    ))}
                    <AlertDialog>
                        <AlertDialogTrigger className='p-medium-14 flex w-full rounded-3xl py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-800'>Create</AlertDialogTrigger>
                        <AlertDialogContent className='bg-white'>
                            <AlertDialogHeader>
                                <AlertDialogTitle>New Category</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <Input type='text' placeholder='Category Name' className='input-field mt-3' onChange={(e)=>setNewCategory(e.target.value)}/>
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={()=> startTransition(handleAddCategory)}>Add</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </SelectContent>
            </Select>
        </div>
    )
}

export default DropDown
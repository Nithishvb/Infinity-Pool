'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  poolName: z.string().min(3, {
    message: "Pool name must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  assetType: z.enum(["SOL", "ETH", "MULTI"]),
  votingRules: z.enum(["MAJORITY", "SUPERMAJORITY"]),
  minContribution: z.number().min(0),
  maxContribution: z.number().min(0),
})

export default function CreatePool() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      poolName: "",
      description: "",
      assetType: "SOL",
      votingRules: "MAJORITY",
      minContribution: 0,
      maxContribution: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    form.reset()
  }

  return (
    <div className="container mx-auto py-10 px-4 md:px-0">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">Create a New Investment Pool</CardTitle>
          <CardDescription>
            Set up your investment pool in just a few steps. Fill out the details below to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="poolName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pool Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pool name" {...field} className="bg-background" />
                    </FormControl>
                    <FormDescription>
                      Choose a unique name for your investment pool.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe the purpose and goals of this pool" 
                        {...field} 
                        className="bg-background resize-none" 
                        rows={4}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide a clear description of the {"pool's"} objectives.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="assetType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select asset type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SOL">SOL</SelectItem>
                          <SelectItem value="ETH">ETH</SelectItem>
                          <SelectItem value="MULTI">Multi-chain</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Choose the type of asset for this pool.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="votingRules"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Voting Rules</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select voting rules" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MAJORITY">Majority</SelectItem>
                          <SelectItem value="SUPERMAJORITY">Supermajority</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Set the voting rules for decision-making in the pool.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="minContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Contribution</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(+e.target.value)}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormDescription>
                        Set the minimum contribution amount.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="maxContribution"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Contribution</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          {...field} 
                          onChange={e => field.onChange(+e.target.value)}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormDescription>
                        Set the maximum contribution amount.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full"
            onClick={form.handleSubmit(onSubmit)} 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Pool...
              </>
            ) : (
              "Create Pool"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}


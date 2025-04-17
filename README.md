# Pique_output_verifier

### This is to ensure the contract between the pique models and the visualizer yvette is creating is up held. 

## Run

- run these commands

```bash

npm run build
npm run start 'path to your eval file'
```

## How is the json defined (crash course in Zod)

```typescript

const RootEvalType = z.object({
    name : z.string(),
    additionalData : z.object({
        projectName : z.string(),
    }),
    global_config : z.object({
        benchmark_strategy : z.string(),
        weights_strategy : z.string(),
    }),
    factors : z.object({
        product_factors : z.record(product_factor),
        quality_aspects : z.record(quality_aspect),
        tqi : z.record(tqi)
    })
});
```

- if you are familiar with json this wont be too bad. The only thing that may not be recognizable is the z.record this is just a way to represent the classic

```json 
{
  "key1": {
    "name": string,
    "value": number
  },
  "key2": {
    "name": string,
    "value": number
  }
}
```
 situation where there is a dictionary of key value pairs where all the values have the same structure. 
 
## please check out src/zod_types/eval.ts to see the full schema
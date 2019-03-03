# p5.gif Final Documentation

P5.gif is a p5 library aiming to provide a native gif experience when you are using p5. In addition, we also want everyone to easily export their piece of work as a format of the gif. So that it will be much easier to share your work with others.

## Team Members

[Jinzhong Yu](https://github.com/NHibiki)
[Wenhe Li](https://github.com/WenheLi)

## Deliverables / Work Product

- [p5.gif](https://github.com/WenheLi/p5.gif)
- [p5.gif Document](https://github.com/WenheLi/p5.gif/wiki)

## Define the problem you addressed and greater landscape

- GIF is a commonly used format to circulate in the web. While p5.js right now doesn't support any direct API related with GIF. We are thinking such a GIF library will be a huge help in terms of internet experience.
- Compared with the video, the GIF format can be a better way to present the project. We want to give an API that allows artists to capture their project and export it as gif during runtime.

## Implementation

- In this library, we utilize the Github to do teamwork. Also, we have written the [Code of Conduct](https://github.com/WenheLI/p5.gif/blob/master/CODE_OF_CONDUCT.md), [Contributing](https://github.com/WenheLI/p5.gif/blob/master/CONTRIBUTING.md) and [Documentation](https://github.com/WenheLI/p5.gif/wiki). We choose our library license as ``MIT`` license. In addition, we include CircleCI as the core Continuous Integration tool. As for the funding, we use the [buy me a coffee](https://bmc.xyz/l/p5gif).

- Tech Specs

  - **jsRoutine**
  jsRoutine is a library built for p5gif to control the lifecycle of gif play or capture. Following the concept in `Golang`, jsRoutine allows users to control the process easily and safely.
  - **gif encoder/decoder**
  To read/save gif file, we need to encode/decode the input file. To achieve this functionality, we include two libraries to do so right now. By following the gif file designed format, the two libraries will write and read bytecode directly to help us convert gif to p5.gif Object.
  - **wrapper**_(factory)_
  Wrapper is a useful software engineer concept to generate functions with similar attributions (aka _prototypes_). We use wrappers to quickly migrate filter functions from p5Image to p5Gif.
  - **build toolchain**
  In this section, we followed the **p5**'s build tool (eg. _grunt_, _eslint_, and _browserfy_). In addition, we also include auto publishment with the CircleCI. 

- Challenges
  - Setuping build tools
- Gif Encoder/Decoder
  - Multitask processing/rendering

- Success & Failure
- **Success**

   We deliver a fully functional library with lovely documentation.
- **Failure**

  A relatively low efficiency of gif converting. 

## Accessibility

We implement ``p5gif.assert`` method that can automatically append ``aria-label`` onto the drawing canvas. So that one can use this method to describe the gif and can be spoked out while using ``Voice Over``.

## Longer-Term Goals

- [ ] Enhance gif converting efficiency. We may plan to use native ``WebGL`` code and ``WebWorker`` with *virtual-canvas* or *canvas compatible API*.
- [ ] Testcase build up. Right now since our library is all about gif drawing and playing, we are still trying to figure out a way to run automatic test cases. 
- [ ] Improvement of encoding/decoding process using ``Web Assembly``.
- [ ] Splitting a stand-alone library out. Users can choose to use p5.gif with p5 or not (Or a function to download and import p5 core library automatically).
- [ ] A smarter accessibility assertive messaging system to inform users of playing status.

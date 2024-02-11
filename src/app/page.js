import Hero from "@/components/layout/hero";
import HomeMenu from "@/components/layout/homeMenu";
import SectionHeader from "@/components/sectionHeader/index ";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMenu />
      <section className="my-16 text-center" id="about">
        <SectionHeader subHeader={"our story"} mainHeader={"About us"} />
        <div className="flex flex-col gap-6 max-w-md text-gray-500 mt-5 mx-auto">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni
            minima odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste
            quos suscipit tempora? Aperiam esse fugiat inventore laboriosam
            officiis quam rem!
          </p>
          <p>
            At consectetur delectus ducimus est facere iure molestias obcaecati
            quaerat vitae voluptate? Aspernatur dolor explicabo iste minus
            molestiae pariatur provident quibusdam saepe?
          </p>
          <p>
            Laborum molestias neque nulla obcaecati odio quia quod reprehenderit
            sit vitae voluptates? Eos, tenetur.
          </p>
        </div>
      </section>

      <section className="my-16 text-center" id="contact">
        <SectionHeader subHeader={"Don't Hesitate"} mainHeader={"Contact us"} />
        <div className="mt-8">
          <a
            className="underline text-4xl text-gray-500"
            href="tel:+46738123123"
          >
            +46 738 123 123
          </a>
        </div>
      </section>
    </>
  );
}

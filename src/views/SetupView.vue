<template>
    <main class="content">
    <h1>Assemblyng Hub: Start</h1>
    <section>
      <h2>Enter the Assemblyre</h2>
      <p> A place to discover programming through a social lens, and in a pseudocode editor. Grab a LYRE, and start creating.</p>
      <router-link class="route" :to="{ name: 'hub', params: { userCode: 'code' }}" >Start Coding [ Course Overview ]</router-link>
      <p>This space was created for my Master's Thesis on Teaching Queer Code. You can grab a PDF! </p>
      <a class="route" href="/assets/queer_code_thesis.pdf">Thesis [ Teaching Queer Code: Educating Computer Science under Social Aesthetics ]</a>
      
    </section>
    <section>
      <h2>Glossary</h2>
      <p>Here a selection of words that you may stumble accross. The definitions for each term emerged from my personal stand point, and provide the base for the research.</p>
      <div class="glossary">
        <div class="glossary-entry"><b>Pseudocode:</b><span> Semantic representation of algorithms and programming processes through custom syntax. Usually defined by scientific convention, its purpose is to explain the code that is executed elsewhere.</span></div>
        <div class="glossary-entry"><b>Pseudoprogram:</b><span> Free interpretation of pseudocode through the addition of custom styling, unconventional syntax and simulated execution. By run- ning the code, choices in both style and program logic influence the visual feedback. Visual feedback is provided through graphical animation. Lines of pseudocode are tagged in their abstract purpose, e.g., they generate, execute, print, assign, or unassign.</span></div>
        <div class="glossary-entry"><b>Pseudoprogram Editor:</b><span> Visual editor inspired by graphical programs and IDEs. They create collage-like animations that feature pseudocode and simulate its execution through visual feedback.</span></div>
        <div class="glossary-entry"><b>Programming:</b><span> Sequence of commands abstracting flows of action, used mostly to describe the working of computers. By mending human language to a form that machines will understand, we define programming languages by how and how far we approach machine language syntactically. </span></div>
        <div class="glossary-entry"><b>Aesthetic Programming:</b><span> Teaching of coding fundamentals through accom- panying discussion of the sociopolitical aspects thereof. Learning different as- pects of programming includes a supplementary analysis of their impact on society and their creative potential.</span></div>
        <div class="glossary-entry"><b>Code:</b><span> Syntax used for programming, largely used synonymously with pro- gramming. When programming is a term more related to the abstract concept of designing requests for a machine to execute, code is related to the explicit syntax used.</span></div>
        <div class="glossary-entry"><b>Queer Code:</b><span> Queering in a technical context means rethinking concepts, shifting the inherent paradigms and actively disengaging from its value in the industrial context. Queer code describes machine logic focused not on perfor- mance and consistency, but on creative expression and abstraction of concepts that are not necessarily to be executed.</span></div>
        <div class="glossary-entry"><b>Cyberfeminism:</b><span> Umbrella term for describing the feminist movement based on experience of individuals in the digital space. It underlines the value of the internet as a political space that is largely influenced by the industry. The goal is to reclaim the internet as a creative medium, providing room for marginal- ized voices in new emerging medial spaces. </span></div>
        <div class="glossary-entry"><b>Post-Digital:</b><span> A paradigm to approach digital media through a lens where technology is no longer a part of society. It enforces the raw, and tangible con- frontation with a medium to invoke critical thoughts, understand the medium’s essential nature, and approach technology less biased from the industrial com- plex.</span></div>
        <div class="glossary-entry"><b>Materiality:</b><span> Introduced by material feminism, materiality refers to the in- dividual’s ability to embody the medium by tangible experiences. Learners are perceived as actively engaging with the non-human medium, and their en- vironment during learning processes. It resembles a basis to identify power dynamics within a context such as technology.</span></div>
        <div class="glossary-entry"><b>Zine:</b><span> A zine is a publication medium used to convey information without the need of dedicated printing. Usually provocative, with a focus on self- expression, or aiming to inform on a special topic. As part of a kit, a zine can be used to inform participants and provide a physical representation of their progress during a study.</span></div>
        <div class="glossary-entry"><b>Peri-Digital:</b><span> The transition between the Digital, and Post-Digital way of designing a course on digital issues. This style relies on an adaptable course form that is able to educate learners through both, digital, and post-digital concepts. The individual is autonomous and has full control over what style adheres to their current goals and need</span></div>
      </div>
    </section>


    </main>
</template>

<script>
export default {
  name: 'SetupView'
  }

</script>

<style scoped>
.glossary {
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
}

.glossary .glossary-entry {
  flex: 0 0 100%;
  display: flex;
  flex-flow: row nowrap;
  gap: 10px;
  align-items: center;
}

.glossary .glossary-entry > b {
  flex: 0 0 200px;
}

section#profiles {
  background: var(--gui-color);
}
.profile-link {
  display: block;
  width: 80px;
  flex: 0 0 80px;
  height: 80px;
  border-radius: 100%;
  background: var(--gui-color);
  color: white;
  text-align: center;
  text-decoration: none;
  font-size: 30px;
  line-height: 0;
  padding: 35px 0;
  border: 5px solid var(--secondary-alt-color);
  transition: .1s;
}

.profile-link:hover {
  background: var(--secondary-alt-color);
  transform: scale(1.1);

}

</style>
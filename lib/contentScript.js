const trimMutations = mutations =>
  mutations
    .filter(mut => mut.type === "childList" && mut.addedNodes.length !== 0)
    .reduce((acc, mut) => [...acc, ...mut.addedNodes], []);

const maskCallback = (mutationsList, _observer) => {
  trimMutations(mutationsList)
    .filter(node => node.getAttribute("role") === "presentation")
    .forEach(node => {
      if (node.textContent.includes("Log in to continue")) {
        node.style.display = "none";
      }
    });
};

const maskObserver = new MutationObserver(maskCallback);
const maskConfig = { childList: true, subtree: true };
maskObserver.observe(document.body, maskConfig);

const loadTimeOverflow = document.body.style.overflow;
const scrollCallback = (mutationsList, _observer) => {
  mutationsList.forEach(mut => {
    if (mut.target.style.overflow !== loadTimeOverflow) {
      mut.target.style.overflow = mut.oldValue;
    }
  });
};

const scrollObserver = new MutationObserver(scrollCallback);
const scrollConfig = { attributeFilter: ["style"] };
scrollObserver.observe(document.body, scrollConfig);

const bannerCallback = (mutationsList, _observer) => {
  trimMutations(mutationsList).forEach(node => {
    if (node.textContent.includes("Log In to Instagram")) {
      node.style.display = "none";
    }
  });
};

const bannerObserver = new MutationObserver(bannerCallback);
const bannerConfig = { childList: true, subtree: true };
bannerObserver.observe(document.querySelector("#react-root"), bannerConfig);

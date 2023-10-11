import { getInput } from "@actions/core";
import { context, getOctokit, } from "@actions/github";

const token = getInput("TOKEN", {required:true});

const name = getInput("NAME");

console.log("Hello via Bun!", "Action created by", name);

console.log("eventName", context.eventName);

console.log("payload", context.payload);

// console.log("context", context);

const api = getOctokit(token);

const allArtifacts = await api.rest.actions.listWorkflowRunArtifacts({
    owner: context.repo.owner,
    repo: context.repo.repo,
    run_id: context.payload.workflow_run.id,
});

console.log("Artifacts", allArtifacts);

let matchArtifact = allArtifacts.data.artifacts.filter((artifact) => {
    return artifact.name == "pr_number"
  })[0];
  let download = await api.rest.actions.downloadArtifact({
     owner: context.repo.owner,
     repo: context.repo.repo,
     artifact_id: matchArtifact.id,
     archive_format: 'zip',
  });

  console.log(download);

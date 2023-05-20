import React,{component} from 'react';
//take screenshot of a web page
import html2canvas from 'html2canvas';
//allows to create pdf of docs
import jsPDF from 'jspdf';

import {vscSettings} from "react-icons/vsc";
import {GrYoutube} from "react-icons/gr";
import {faLinkedin} from "react-icons/fa";
import {FaGithub} from "react-icons/fa";
import {SiGmail} from "react-icons/si";
import { TiTickOutline } from "react-icons/ti";
import { ImCross } from "react-icons/im";

export default class PathFindingVisualizer extends component
{
    constructor(props){
        super(props);
        if(window.screen.width<500)
        {
            this.state={
                grid:[],
                errorMessage:"",
                dragNode:"normal",
                /*
                phases:
                1:preMaze
                2:maze
                3:postMaze
                */
                phase:"preMaze",
                mazeGenerationSpeed:10,
                animationState:true,
                points:{
                    start:{row:12,col:0},
                    finish:{row:12,col:9},
                },
                length:{row:26,col:10},
            };
        }
        else
        {
            this.state={
                grid:[],
                errorMessage:"",
                dragNode:"normal",
                /*
                phases:
                1:preMaze
                2:maze
                3:postMaze
                */
                phase:"preMaze",
                mazeGenerationSpeed:10,
                animationState:true,
                points:{
                    start:{row:12,col:0},
                    finish:{row:12,col:49},
                },
                length:{row:27,col:50},
            };
        }
    }
}


//creating grid

//use this componentDidMount to create grid
componentDidMount=()=>{
    const grid = getGrid(
      this.state.length.row,
      this.state.length.col,
      this.state.points.start.row,
      this.state.points.start.col,
      this.state.points.finish.row,
      this.state.points.finish.col
    );
    this.setState({
        grid,
    });
};

visualizeMazeGeneration=()=>{
    this.setState({phase:"Maze"});
    const {grid}=this.state;
    const startNode=grid[this.state.points.start.row][this.state.points.start.col];
    
    const finishNode=grid[this.state.points.finish.row][this.state.points.finish.col];

    // let visitedNodesInOrder=[];

    const visitedNodesInOrder=dfs(grid,startNode,finishNode);

    this.animateMazeGeneration(visitedNodesInOrder,grid);
};


animateMazeGeneration(visitedNodesInOrder,grid)
{
    if(this.state.animationState)
    {
        for(let i=1;i<visitedNodesInOrder.length;i++)
        {
            setTimeout(()=>
            {
                if(i===visitedNodesInOrder.length-1)
                {
                    this.setState({phase:"postMaze"});
                    // this.setState({animationState:false});
                    this.setState({grid:grid,});
                }
                const node=visitedNodesInOrder[i];
                const nodeElement=document.getElementById(`node-${node.row}-${node.col}`);

                // nodeElement.classList.remove("visited");
                nodeElement.classList.add("node");

                if(nodeElement.classList.remove("node-finish"))
                {
                    console.log("finish");
                }
                else if(nodeElement.classList.remove("node-visited"))
                {
                    nodeElement.classList.remove("node-visited");
                    // console.log("node-visited");
                    nodeElement.classList.add("RevisitedNode");
                }
                else
                {
                    nodeElement.classList.add("node-visited");
                }
                if(node.topWall)
                {
                    nodeElement.classList.add("topWall");
                }
                if(node.bottomWall)
                {
                    nodeElement.classList.add("bottomWall");
                }
                if(node.leftWall)
                {
                    nodeElement.classList.add("leftWall");
                }
                if(node.rightWall)
                {
                    nodeElement.classList.add("rightWall");
                }
            },(300*i)/this.state.mazeGenerationSpeed);
        }
    }
    else
    {
        for(let i=1;i<visitedNodesInOrder.length;i++)
        {
            if(i===visitedNodesInOrder.length-1)
            {
                this.setState({phase:"postMaze"});
                // this.setState({animationState:false});
                this.setState({grid:grid,});
            }
            const node=visitedNodesInOrder[i];
            const nodeElement=document.getElementById(`node-${node.row}-${node.col}`);
            nodeElement.classList.add("node");
            if(nodeElement.classList.remove("node-finish"))
            {
                console.log("finish");
            }
            else if(nodeElement.classList.remove("node-visited"))
            {
                nodeElement.classList.remove("node-visited");
                // console.log("node-visited");
                nodeElement.classList.add("RevisitedNode");
            }
            else
            {
                nodeElement.classList.add("node-visited");
            }
            if(node.topWall)
            {
                nodeElement.classList.add("topWall");
            }
            if(node.bottomWall)
            {
                nodeElement.classList.add("bottomWall");
            }
            if(node.leftWall)
            {
                nodeElement.classList.add("leftWall");
            }
            if(node.rightWall)
            {
                nodeElement.classList.add("rightWall");
            }
        }
    }
}
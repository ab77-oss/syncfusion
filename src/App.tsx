import React from 'react';
import './App.css';
import { GanttComponent, TaskFieldsModel, ColumnsDirective, ColumnDirective, Edit, Inject, Toolbar, Selection, Filter, PdfExport} from '@syncfusion/ej2-react-gantt';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { projectData, templateData , resourceDetails} from './data';
import {PdfColor} from '@syncfusion/ej2-react-export'

function App() {
  let ganttInst:GanttComponent | null;
  const editOptions: any = {
    allowEditing:true,
    allowAdding:true,
    allowDeleting:true,
    allowTaskbarEditing:true,
    mode:"Auto"
  }
  const taskValues: TaskFieldsModel = {
    id: "TaskID",
    name: "TaskName",
    startDate: "StartDate",
    endDate: "EndDate",
    duration: "Duration",
    progress: "Progress",
    dependency: "Predecessor",
    child: "subtasks",
    resourceInfo: "resources"
  }
  // To use self-referential data, comment out data manager related code
  // eslint-disable-next-line
  const remoteData: DataManager = new DataManager({
    url: "https://ej2services.syncfusion.com/production/web-services/api/GanttData",
    adaptor: new WebApiAdaptor()
  });
  const customizeColumn =(props: any) =>{
    if((props.ganttProperties.resourceNames)){
    return ( 
    <div>
      <img  src={'https://ej2.syncfusion.com/react/demos/src/gantt/images/' + props.ganttProperties.resourceNames + '.png'} alt=""/>
    </div>);
    } else {
     return <div></div>
    }
  }

  const cusomizeHeader =(props:any) => {
    return <span className="e-icon-userlogin">Resources</span>
  }
  // const onToolbarClick =(props: any) =>{
  //   if(props.item.id === 'filter'){
  //     (ganttInst as GanttComponent).filterByColumn('resources', 'startswith', 'M');
  //   }
  //   else if(props.item.id === 'clearfilter'){
  //     (ganttInst as GanttComponent).clearFiltering();
  //   }
  // }
  const onToolbarClick =(args: any) =>{
     if(args.item.id.includes("pdfexport")){
      (ganttInst as GanttComponent).pdfExport({
        fileName:"projectData.pdf",
        enableFooter:false,
        showPredecessorLines:false,
        theme:"Fabric",
        ganttStyle:{

        }
      });
     }
   }

  return (
    <div>
      <GanttComponent dataSource={projectData} ref={g=> ganttInst = g}
          taskFields={taskValues} 
          resources={resourceDetails} rowHeight={35}
          editSettings={editOptions}
          toolbar={["Add", 'Edit', 'Delete', 'Update', 'Cancel', 'ExpandAll', 'CollapseAll', {text: "Filter", id:"filter"}, {text: "Clear Filter", id:"clearfilter"}, "PdfExport"]}
          toolbarClick={onToolbarClick}
          allowSelection={true}
          allowFiltering={true}
          allowPdfExport={true}
          resourceFields={{id: "resourceId", name: "resourceName"}}>
           <Inject services={[Edit, Toolbar, Selection, Filter, PdfExport]}></Inject>
        <ColumnsDirective>
          <ColumnDirective field="TaskId" headerText="ID" width="100"></ColumnDirective>
          <ColumnDirective field="TaskName" headerText="Name" width="250"></ColumnDirective>
          <ColumnDirective field="StartDate" format="dd-MMM-yy"></ColumnDirective>
          <ColumnDirective field="resources" format="dd-MMM-yy" width="250" template={customizeColumn} headerTemplate={cusomizeHeader}></ColumnDirective>
          <ColumnDirective field="Duration"></ColumnDirective>
        </ColumnsDirective>
      </GanttComponent>
    </div>
  );
}

export default App;